module.exports = {

    NPM_JSON_QUERY: function() {
        return "axios, eval";
    },
    
    JSON_QUERY: async function (URL, JSON_Query) { 
        try {
            const axios = require('axios');
            var _eval = require('eval');
        
            var Source = await axios.get(URL);          
            var jsonFlat = JSON.stringify(Source.data);
        
            return eval("JSON.parse(jsonFlat)." + JSON_Query);
        } catch(ERR) {
            return "ERROR@JSON_QUERY: " + ERR;
        }
    },

    NPM_XML_QUERY: function() {
        return "request, request-promise, xpath, xmldom";
    },
    
    XML_QUERY: async function (URL, XPATH_Query) {
        try {
            var rp = require('request-promise');
            var xpath = require('xpath');
            var dom = require('xmldom').DOMParser;
        
            var Source = await rp(URL);          
        
            var doc = new dom({errorHandler:{}}).parseFromString(Source);
            return xpath.select(XPATH_Query, doc);
        } 
        catch(ERR)
        {
            return "ERROR@XML_QUERY: " + ERR;
        }
    },

    NPM_HTML_QUERY: function() {
        return "request, request-promise, cheerio, eval";
    },
    
    HTML_QUERY: async function (URL, QUERY) {
        try {
            var rp = require('request-promise');
            var cheerio = require('cheerio');
            var _eval = require('eval');
            var html = await rp(URL);
            const $ = cheerio.load(html);
            var QUERY_RESULT = "unkown";
            eval(QUERY);
            return QUERY_RESULT;
        }
        catch(ERR) {
            return "ERROR@HTML_QUERY: " + ERR;
        }
    },

    IsJSONrequest: function (URL) {
        if(URL)
            if(URL.startsWith("json:"))
                return true;
        return false;
    },
    
    IsXMLrequest: function (URL) {
        if(URL)
            if(URL.startsWith("xml:"))
                return true;
        return false;
    },

    IsHTMLrequest: function (URL) {
        if(URL)
            if(URL.startsWith("html:"))
                return true;
        return false;
    },
    
    ChopURL: function (URL) {
        if(this.IsJSONrequest(URL) || this.IsHTMLrequest(URL))
            return URL.substring(5);
        else
            if(this.IsXMLrequest(URL))
                return URL.substring(4);
    
        return URL;
    }
    
}