/*Admin options pannal data value*/
function weblizar_option_data_save(name) {
  var weblizar_settings_save = "#weblizar_settings_save_" + name;
  var weblizar_theme_options = "#weblizar_theme_options_" + name;
  var weblizar_settings_save_success = weblizar_settings_save + "_success";
  var loding_image = "#weblizar_loding_" + name;
  var weblizar_loding_image = loding_image + "_image";

  jQuery(weblizar_loding_image).show();
  jQuery(weblizar_settings_save).val("1");
  jQuery.ajax({
    url: "themes.php?page=weblizar",
    type: "post",
    data: jQuery(weblizar_theme_options).serialize(),
    success: function (data) {
      jQuery(weblizar_loding_image).fadeOut();
      jQuery(weblizar_settings_save_success).show();
      jQuery(weblizar_settings_save_success).fadeOut(5000);
    },
  });
}
/*Admin options value reset */
function weblizar_option_data_reset(name) {
  var r = confirm("Do you want reset your theme setting!");
  if (r == true) {
    var weblizar_settings_save = "#weblizar_settings_save_" + name;
    var weblizar_theme_options = "#weblizar_theme_options_" + name;
    var weblizar_settings_save_reset = weblizar_settings_save + "_reset";
    jQuery(weblizar_settings_save).val("2");
    jQuery.ajax({
      url: "themes.php?page=weblizar",
      type: "post",
      data: jQuery(weblizar_theme_options).serialize(),
      success: function (data) {
        jQuery(weblizar_settings_save_reset).show();
        jQuery(weblizar_settings_save_reset).fadeOut(5000);
      },
    });
  } else {
    alert("Cancel! reset theme setting process");
  }
}
// js to active the link of option pannel
jQuery(document).ready(function () {
  jQuery("ul li.active ul").slideDown();
  // menu click
  jQuery("#nav > li > a").click(function () {
    if (jQuery(this).attr("class") != "active") {
      jQuery("#nav li ul").slideUp(350);
      jQuery(this).next().slideToggle(350);
      jQuery("#nav li a").removeClass("active");
      jQuery(this).addClass("active");

      jQuery("ul.options_tabs li").removeClass("active");
      jQuery(this).parent().addClass("active");
      var divid = jQuery(this).attr("id");
      var add = "div#option-" + divid;
      var strlenght = add.length;

      if (strlenght < 17) {
        var add = "div#option-ui-id-" + divid;
        var ulid = "#ui-id-" + divid;
        jQuery("ul.options_tabs li li ").removeClass("currunt");
        jQuery(ulid).parent().addClass("currunt");
      }
      jQuery("div.ui-tabs-panel").addClass("deactive").fadeIn(1000);
      jQuery("div.ui-tabs-panel").removeClass("active");
      jQuery(add).removeClass("deactive");
      jQuery(add).addClass("active");
    }
  });

  // child submenu click
  jQuery("ul.options_tabs li li ").click(function () {
    jQuery("ul.options_tabs li li ").removeClass("currunt");
    jQuery(this).addClass("currunt");
    var option_name = jQuery(this).children("a").attr("id");
    var option_add = "div#option-" + option_name;
    jQuery("div.ui-tabs-panel").addClass("deactive").fadeIn(1000);
    jQuery("div.ui-tabs-panel").removeClass("active");
    jQuery(option_add).removeClass("deactive");
    jQuery(option_add).addClass("active");
  });

  /********media-upload******/
  // media upload js
  var uploadID = ""; /*setup the var*/
  var showImg = "";
  jQuery(".upload_image_button").click(function () {
    uploadID = jQuery(this).prev("input"); /*grab the specific input*/
    showImg = jQuery(this).nextAll("img");
    formfield = jQuery(".upload").attr("name");
    tb_show("", "media-upload.php?type=image&amp;TB_iframe=true");

    window.send_to_editor = function (html) {
      imgurl = jQuery("img", html).attr("src");
      showImg.attr("src", imgurl);
      uploadID.val(imgurl); /*assign the value to the input*/
      tb_remove();
    };
    return false;
  });
});
jQuery(document).ready(function () {
  jQuery("#preloaer_anim_btn").click(function () {
    var element_preloader_data = jQuery(
      "#preloader_element_hidden_loader"
    ).val();
    var $temp = jQuery("<textarea>");
    jQuery("body").append($temp);
    $temp.val(element_preloader_data).select();
    try {
      var successful = document.execCommand("copy");
      if (successful) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 3000);
      } else {
        console.error("Copy failed");
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }

    $temp.remove();
  });

  // select preloder js
  // jQuery('#weblizar_pre_loader').on('change', function(e){
  //   e.preventDefault();
  //   var selected_opt = jQuery(this).val();
  //   console.log(selected_opt)
  // })
});
