"use strict";

var $ = require('jquery');

var settings = require('../settings.js');

module.exports = {
    shorten: function(url, success_cb) {
        var post_url = "https://www.googleapis.com/urlshortener/v1/url?key=" + settings.url_api_key;
        var payload = {longUrl: url}
        var response = $.ajax({
            url: post_url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: function(response) {
                success_cb(response.id);
            }});
    }
}