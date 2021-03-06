
(function() {

    /**
     * Before creating the OpenLayers namespace, check to see if
     * gis.singleFile is true.  This occurs if the
     * gis/SingleFile.js script is included before this one - as is the
     * case with old single file build profiles that included both
     * gis.js and justice/singleFile.js.
     */
    var singleFile = (typeof gis == "object" && gis.singleFile);

    /**
     * スクリプトのパス.
     */
    var scriptName = (!singleFile) ? "lib/gis.js" : "gis.js";

    /*
     * If window.justice isn't set when this script (justice.js) is
     * evaluated (and if singleFile is false) then this script will load
     * *all* justice scripts. If window.OpenLayers is set to an array
     * then this script will attempt to load scripts for each string of
     * the array, using the string as the src of the script.
     *
     * Example:
     * (code)
     *     <script type="text/javascript">
     *         window.gis = [
     *             "gis/util.js"
     *         ];
     *     </script>
     *     <script type="text/javascript" src="../lib/gis.js"></script>
     * (end)
     * In this example gis.js will load util.js only.
     */
    var jsFiles = window.gis;

    /**
     * 名前空間: gis
     * The gis object provides a namespace for all things gis
     */
    window.gis = {
    		/**
    		 * このスクリプトのパスを返す
    		 * @returns {function}
    		 */
            _getScriptLocation: (function() {
                var r = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)"),
                    s = document.getElementsByTagName('script'),
                    src, m, l = "";
                for(var i=0, len=s.length; i<len; i++) {
                    src = s[i].getAttribute('src');
                    if(src) {
                        m = src.match(r);
                        if(m) {
                            l = m[1];
                            break;
                        }
                    }
                }
                return (function() { return l; });
            })()
    };

    /**
     * OpenLayers.singleFile is a flag indicating this file is being included
     * in a Single File Library build of the OpenLayers Library.
     *
     * When we are *not* part of a SFL build we dynamically include the
     * OpenLayers library code.
     *
     * When we *are* part of a SFL build we do not dynamically include the
     * OpenLayers library code as it will be appended at the end of this file.
     */
    if(!singleFile) {
    	//読みこむスクリプトファイルパスを列挙する
        if (!jsFiles) {
            jsFiles = [
            	'gis/util.js',
                'gis/ui.js',
                'gis/ui/controlLoader.js',
                'gis/ui/layerLoader.js',
                'gis/ui/dialog.js',
                'gis/ui/dialog/zoomToAdmin.js',
                'gis/ui/dialog/zoomToWss.js',
                'gis/ui/dialog/epanet.js',
                'gis/ui/layer.js',
                'gis/ui/layer/WMS.js',
                'gis/ui/layer/WMS_getFeatureInfo.js',
                'gis/ui/layer/WMTS.js',
                'gis/ui/layer/TMS.js',
                'gis/ui/layer/vector.js',
                'gis/ui/layer/vector/GeoJSON.js',
                'gis/ui/layer/vector/WFS.js',
                'gis/ui/layer/vector/WFST.js',
            ]; // etc.
        }

      //スクリプトファイルを読み込む
        var scriptTags = new Array(jsFiles.length);
        var host = gis._getScriptLocation() + '/lib/';
        var date = new Date();
        for (var i=0, len=jsFiles.length; i<len; i++) {
        	var filepath = host + jsFiles[i] + "?version=" + date.getTime();
        	if (jsFiles[i].substr(0,1) === '.'){
        		filepath = jsFiles[i];
        	}
            scriptTags[i] = "<script src='" + filepath + "'></script>";
        }
        if (scriptTags.length > 0) {
            document.write(scriptTags.join(""));
        }
    }

})();

/**
 * Constant: VERSION_NUMBER
 */
gis.VERSION_NUMBER="Release 0.1";