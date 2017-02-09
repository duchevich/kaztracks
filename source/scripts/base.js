$(document).ready(function() {


      /*---- NAV SCROLLING ----*/

      var scrollTop = 0;
      $(window).on('scroll', function() {
            var scrollNow = $(window).scrollTop();
            if(scrollNow > scrollTop && scrollNow > 20){
                  $('#navbar-collapse').addClass('navbar-setout');
            } 
            else {
                  $('#navbar-collapse').removeClass('navbar-setout');
            }
            //scrollTop=scrollNow;
      });




      /*---- MASONRY ----*/
      
      var container = document.querySelector('#container');
      var msnry = new Masonry( container, {
      // Настройки
            columnWidth: '.item',
            itemSelector: '.item'
      });
   

      /*---- SLICEBOX ----*/

      $(function() {
            var Page = (function() {
                  var $navArrows = $( '#nav-arrows' ).hide(),
                  $navDots = $( '#nav-dots' ).hide(),
                  $nav = $navDots.children( 'span' ),
                  $shadow = $( '#shadow' ).hide(),
                  slicebox = $( '#sb-slider' ).slicebox( {
                        onReady : function() {
                              $navArrows.show();
                              $navDots.show();
                              $shadow.show();
                              slicebox.play();
                        },
                        orientation : 'r',
                        cuboidsRandom : true,
                        disperseFactor : 30,
                        onBeforeChange : function( pos ) {
                              $nav.removeClass( 'nav-dot-current' );
                              $nav.eq( pos ).addClass( 'nav-dot-current' );
                        }
                  } ),
                  init = function() {
                        initEvents();
                  },
                  initEvents = function() {
                        // add navigation events
                        $navArrows.children( ':first' ).on( 'click', function() {
                              slicebox.next();
                              return false;
                        } );
                        $navArrows.children( ':last' ).on( 'click', function() {
                              slicebox.previous();
                              return false;
                        } );
                        $nav.each( function( i ) {
                              $( this ).on( 'click', function( event ) {
                                    var $dot = $( this );
                                    if( !slicebox.isActive() ) {
                                          $nav.removeClass( 'nav-dot-current' );
                                          $dot.addClass( 'nav-dot-current' );
                                    }
                                    slicebox.jump( i + 1 );
                                    return false;
                              } );
                        } );
                  };
                  return { init : init };
            })();
            Page.init();
      });
      


      /*---- WRAP ----*/

      $(function() {
            $('.img').click(function() {
                  if($(this).hasClass('img-ver')){
                        //var wrap = $(this).parent().css('transform');
                        if($(this).parent().css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                              $(this).parent().css({'transform':'rotateX(180deg)'});
                              $(this).parent().css({'box-shadow':'0 -5px 10px rgba(0,0,0,0.5)'});
                        } 
                        else {
                              $(this).parent().css({'transform':'rotateX(0deg)'});
                              $(this).parent().css({'box-shadow':'0 5px 10px rgba(0,0,0,0.5)'});
                        }
                  }
                  else{
                        //var wrap = $(this).parent().css('transform');
                        if($(this).parent().css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                              $(this).parent().css({'transform':'rotateY(180deg)'});
                        } 
                        else {
                              $(this).parent().css({'transform':'rotateY(0deg)'});
                        }
                  }
            });
      });
})

