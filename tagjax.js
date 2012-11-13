/******************************************
 * CloudWizard.com
 *
 *
 * @author          Alvin Wang
 * @copyright       Copyright (c) 2012 Cloud Wizard Corp.
 * @license         This TagJax jQuery plugin is licensed under the BSD.
 * @link            http://www.cloudwizard.com
 * @github          http://github.com/cloudwizard/tagjax
 * @version         0.1.0
 *
 ******************************************/

(function($)
{
  $.fn.tagjax = function(option, settings)
  {
    if(typeof option === 'object')
    {
      settings = option;
    }
    else if(typeof option === 'string')
    {
      var values = [];

      var elements = this.each(function()
      {
        var data = $(this).data('_tagjax');

        if(data)
        {
          if(option === 'reset') { data.reset(); }
          else if(option === 'theme') { data.setTheme(settings); }
          else if($.fn.tagjax.defaultSettings[option] !== undefined)
          {
            if(settings !== undefined) { data.settings[option] = settings; }
            else { values.push(data.settings[option]); }
          }
        }
      });

      if(values.length === 1) { return values[0]; }
      if(values.length > 0) { return values; }
      else { return elements; }
    }

    return this.each(function()
    {
      var $elem = $(this);

      var $settings = $.extend({}, $.fn.tagjax.defaultSettings, settings || {});

      var tagjax = new TagJax($settings, $elem);

      var $el = tagjax.initialize($elem);

      //$('body').append($el);
      // $elem.append($el);

      $elem.data('_TagJax', tagjax);
    });
  }

  $.fn.tagjax.defaultSettings = {
    prefix   : 'data-',
    debug   : false,
    onClick   : null
  };

  function TagJax(settings, $elem)
  {
    this.tagjax = null;
    this.settings = settings;
    this.$elem = $elem;

    return this;
  }

  TagJax.prototype = 
  {
    initialize: function($elem)
    {
      var $this = this;

      if($this.tagjax) return $this.tagjax;

      $this.tagjax = $('<div class="_TagJax_holder"></div>');

      var tag_type = $this.settings.prefix+'type';
      var flg_cookie_req = $elem.attr($this.settings.prefix+'cookiereq');
      if (typeof flg_cookie_req !== 'undefined' && flg_cookie_req !== false) {
        // error check for cookie properly
        if(document.cookie.indexOf(flg_cookie_req) == -1){
          $elem.css( 'cursor', 'pointer' )
          .click(function(ev)
          {
            ev.preventDefault();
            alert( $elem.attr($this.settings.prefix+'cookiemsg'))
            return false;
          });
          return $this.tagjax;
        }
      }

      switch($elem.attr(tag_type))
      {

      case 'inc':
        $this.log($this, 'set inc');
        $elem.css( 'cursor', 'pointer' )
        .click(function(ev)
        {
          ev.preventDefault();
          $this.log($this, 'click inc');
          $this.processResult($this, $elem, $this.incCount($this, $elem));
          return false;
        });

        break;
      case 'formmodal':
        // Button to display modal form
        $this.log($this, 'Setup Form Modal');

        $elem.css( 'cursor', 'pointer' )
        .click(function()
        {

          $this.log($this, 'click Form Modal');
          $('#'+$elem.attr($this.settings.prefix+'formid')).modal('show');
        });
        break;
      case 'formsave':
        $this.log($this, 'Setup Form Save');
        $elem.css( 'cursor', 'pointer' )
        .click(function()
        {

          $this.log($this, 'click Form Save');

          $('#'+$elem.attr($this.settings.prefix+'formid')).modal('show');
        });
        break;
      case 'formsetup':
        // Not Working Yet
        // validate/ ajaxform
        $this.log($this, 'Setup FormSetup');

        $elem.validate({
          highlight: function(label) {
            $(label).closest('.control-group').addClass('error');
          },
          success: function(label) {
            label
              .text('OK!').addClass('valid')
              .closest('.control-group').addClass('success');
          },
          submitHandler: function(form) {
            console.log('form submit handler');
            alert('submit start');
            // form.preventDefault();
            jQuery(form).ajaxSubmit( { 
              // url:        '/user/moduleajax', 
              success:    function(responseText) { 
                  alert(responseText.status); 
              }
            });
          }
        });
        $elem.ajaxForm();
      case 'alert':
        $this.log($this, 'set Alert');
        $elem.css( 'cursor', 'pointer' )
        .click(function()
        {
          $this.alert($this, $elem);
        });
        break;      
      case 'fblogout':
        $this.log($this, 'Set Logout');
        $elem.css( 'cursor', 'pointer' )
        .click(function()
        {
          FB.logout(function(response) {
            location.reload();

          });
        });
        break;
      case 'custom1':
        $elem.css( 'cursor', 'pointer' )
        .click(function(ev)
        {
          ev.preventDefault();
          // check if function valid before calling
          return tagjax_custom1($this, $elem);
        });

        break;
      case 'custom2':
        $elem.css( 'cursor', 'pointer' )
        .click(function(ev)
        {
          // check if function valid before calling
          ev.preventDefault();
          return tagjax_custom2($this, $elem);
        });
        break;
      case 'custom3':
        $elem.css( 'cursor', 'pointer' )
        .click(function(ev)
        {
          // check if function valid before calling
          ev.preventDefault();
          return tagjax_custom3($this, $elem);
        });
        break;
      case 'custom4':
        $elem.css( 'cursor', 'pointer' )
        .click(function(ev)
        {
          // check if function valid before calling
          ev.preventDefault();
          return tagjax_custom4($this, $elem);
        });
        break;
      case 'custom5':
        $elem.css( 'cursor', 'pointer' )
        .click(function(ev)
        {
          // check if function valid before calling
          ev.preventDefault();
          return tagjax_custom5($this, $elem);
        });
        break;
      case 'custom6':
        $elem.css( 'cursor', 'pointer' )
        .click(function(ev)
        {
          // check if function valid before calling
          ev.preventDefault();
          return tagjax_custom6($this, $elem);
        });
        break;
      default:
        $this.log($this, 'Tagjax error - unable to find type');
      };
      // multi event capture via chaining
      /*
      $this.tagjax
      .click(function()
      {
        $this.tagjax.html('you clicked me!');

        if($this.settings.onClick) $this.settings.onClick.apply($this, []);
      })
      .mousedown(function() //works on mobile too
      {
        $this.tagjax.html('you mouse downed me!');
      });

      $this.bindMobile($this.tagjax);
      $this.setTheme($this.settings.theme);
      $this.reset();
      */
      return $this.tagjax;
    },


    incCount: function($this, $elem)
    {
      // data_countid = id of count
      // counturl = 
      $this.log($this,'Start Increment prefix='+$this.settings.prefix);
      var count_url = $elem.attr($this.settings.prefix+'counturl');
      var result = true;

      if (typeof count_url !== 'undefined' && count_url !== false) {
        $this.log($this,'Get function='+count_url);
        $.get(count_url, function(data) {
          $this.log($this,'incCount result ='+data.status);
          if(data.status =='ok') {
            var count_id = $elem.attr($this.settings.prefix+'countid');
            if (typeof count_id !== 'undefined' && count_id !== false) {
              var view_cnt = '#'+count_id;
              var new_cnt = parseInt($(view_cnt).text(),0) + 1;
              $(view_cnt).text(new_cnt);
            };
            result = true;
            return true;
          } else {
            if(data.status == 'alert') {
              alert(data.msg);
            }
            result = false;
            return false;
          };
        });
      } else {
        $this.log($this, 'No count URL found');
        result = false;
      };
      return result;
    },
    processResult: function($this, $elem,$result)
    {
      if($result) {
        $this.processResult2($this, $elem, 'success');
      } else {
        $this.processResult2($this, $elem, 'fail');
      };
      return false;
    },
    processResult2: function($this, $elem, prefix2)
    {     
      // loop through actions in data-succcess or fail
      // actions are comma separated
      var $prefix2 = $this.settings.prefix+prefix2+'-';
      var $actions = $elem.attr($this.settings.prefix+prefix2);
      console.log($actions);
      if(typeof $actions !== 'undefined' && $actions !== false) {
        $actions = $actions.split(',');
        for (var i = 0; i < $actions.length; i++) {
          alert($actions[i]);
          //Do something
        }
      }
    },
    alert: function($this, $elem)
    {
      var msg = $elem.attr($this.settings.prefix+'msg');

      if (typeof msg !== 'undefined' && msg !== false) {
        alert(msg);
      };
    },
    log: function($this, logmsg)
    {
      if ($this.settings.debug) {
        console.log(logmsg);
      };
    },

    reset: function()
    {
      this.tagjax.html('click me');
    },

    bindMobile: function($el, preventDefault)
    {
      $el.bind('touchstart touchmove touchend touchcancel', function ()
      {
        var touches = event.changedTouches, first = touches[0], type = ""; 

        switch (event.type)
        {
          case "touchstart": type = "mousedown"; break; 
          case "touchmove": type = "mousemove"; break; 
          case "touchend": type = "mouseup"; break; 
          default: return;
        }

        var simulatedEvent = document.createEvent("MouseEvent"); 

        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
        first.target.dispatchEvent(simulatedEvent);

        if(preventDefault) { event.preventDefault(); }
      });
    }
  }
})(jQuery);