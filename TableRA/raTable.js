define( ["qlik", "jquery", "css!./style.css","./properties","./initialproperties","angular","qvangular"],
function ( qlik, $, cssContent, props, initprops) {
  'use strict';
  $( "<style>" ).html( cssContent ).appendTo( "head" );


  function createRows ( rows, dimensionInfo ) {
    var html = "";
    rows.forEach( function ( row ) {
      html += '<tr>';
      row.forEach( function ( cell, key ) {
        if ( cell.qIsOtherCell ) {
          cell.qText = dimensionInfo[key].othersLabel;
        }
        html += "<td class='";
        if ( !isNaN( cell.qNum ) ) {
          html += "numeric ";
        }
        //total (-1)  is not selectable
        if ( key < dimensionInfo.length && cell.qElemNumber !== -1 ) {
          html += "selectable' data-value='" + cell.qElemNumber + "' data-dimension='" + key + "'";
        } else {
          html += "'";
        }
        html += '>' + cell.qText + '</td>';
      } );
      html += '</tr>';
    } );
    return html;
  }

  return {
    definition: props,
    initialProperties: initprops,
    support: {
      snapshot: true,
      export: true,
      exportData: true
    },
    paint: function ( $element, layout ) {

      var vars = {
              id: layout.qInfo.qId,
              titleAlignment: layout.titleTextAlignment,
              titleFontColor: layout.titleFontColor,
              titleBackground: layout.titleBackground,
              titleFontsize: layout.titleFontsize,
              titleFontstyle: layout.titleFontstyle,
              myHTML: ''
      };


        vars.myHTML = "<div class='aExtensionContainer'>" + "<div class='aTableContainer'>";
        vars.myHTML += "<table class='aTableSection'><thead><tr>";
        var self = this, morebutton = false,
        hypercube = layout.qHyperCube,
        rowcount = hypercube.qDataPages[0].qMatrix.length,
        colcount = hypercube.qDimensionInfo.length + hypercube.qMeasureInfo.length;
      //render titles
      hypercube.qDimensionInfo.forEach( function ( value ) {
        vars.myHTML += "<th class='raTableCell'>" + value.qFallbackTitle + "</th>";
      } );
      hypercube.qMeasureInfo.forEach( function ( value ) {
        vars.myHTML += "<th class='raTableCell'>" + value.qFallbackTitle + "</th>";
      } );
      vars.myHTML += "</tr></thead><tbody>";
      //render data
      vars.myHTML += createRows( hypercube.qDataPages[0].qMatrix, hypercube.qDimensionInfo );
      vars.myHTML += "</tbody></table></div>";

      //add 'more...' button
      if ( hypercube.qSize.qcy > rowcount ) {
        vars.myHTML += "<button id='more'>More...</button>";
        vars.myHTML += "</div>"; ////// last div
        morebutton = true;
      }
      $element.html(vars.myHTML );
      if ( morebutton ) {
        $element.find( "#more" ).on( "qv-activate", function () {
          var requestPage = [{
            qTop: rowcount,
            qLeft: 0,
            qWidth: colcount,
            qHeight: Math.min( 50, hypercube.qSize.qcy - rowcount )
          }];
          self.backendApi.getData( requestPage ).then( function ( dataPages ) {
            rowcount += dataPages[0].qMatrix.length;
            if(rowcount>= hypercube.qSize.qcy){
              $element.find( "#more" ).hide();
            }
            vars.myHTML = createRows( dataPages[0].qMatrix, hypercube.qDimensionInfo );
            $element.find("tbody" ).append(vars.myHTML);
          } );
        } );
      }
      //setup selections
      ;


      var vHeaderAlignText = "";
			switch (vars.titleAlignment)
			{
				case 1:
				vHeaderAlignText = "left";
				break;
				case 2:
				vHeaderAlignText = "center";
				break;
				case 3:
				vHeaderAlignText = "right";
				break;
			}

      var vHeaderStyle = "";
			switch (vars.titleFontstyle)
			{
				case true:
				vHeaderStyle = "bold";
				break;
				case false:
				vHeaderStyle = "normal";
				break;
			}
/////////-----------------------------------CSS ------------------------------------------

      $element.find("table.aTableSection thead").css("background",vars.titleBackground);


      $element.find("table.aTableSection th").css({"text-align": vHeaderAlignText,
                                                    "color": vars.titleFontColor,
                                                    "font-size": vars.titleFontsize,
                                                    "font-weight": vHeaderStyle,
                                                    "background": vars.titleBackground});

      $element.find('td').on('qv-activate', function() {
          if(this.hasAttribute("data-value")) {
            var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
                self.backendApi.selectValues(dim, [value], true);
          }
      });
                                              //


      return qlik.Promise.resolve();
    }
  };
} );

				//setup selections

	// 			return qlik.Promise.resolve();
	// 		}
	// 	};
	// } );
