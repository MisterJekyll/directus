/**
 * Created by clement on 2/02/17.
 */

PDFJS.workerSrc = '/assets/js/libs/pdf.worker.js';
pdf_loading_task;

//https://snazzymaps.com/style/29/light-monochrome
window.mapstyle = [
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#2c2e33"
            },
            {
                "saturation": 7
            },
            {
                "lightness": 19
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#bbc0c4"
            },
            {
                "saturation": -93
            },
            {
                "lightness": 31
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bbc0c4"
            },
            {
                "saturation": -93
            },
            {
                "lightness": 31
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bbc0c4"
            },
            {
                "saturation": -93
            },
            {
                "lightness": -2
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": -90
            },
            {
                "lightness": -8
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": 10
            },
            {
                "lightness": 69
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e9ebed"
            },
            {
                "saturation": -78
            },
            {
                "lightness": 67
            },
            {
                "visibility": "simplified"
            }
        ]
    }
];

function MJtoDecimal(number) {
    return number[0].numerator + number[1].numerator /
        (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
}

function MJvalidateLatLng(num) {
    if (typeof num === 'number' && num <= 90 && num >= -90) return true;
    return false;
}

function MJsetNewAddress(address) {
    /*
     Examples:
     https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7059694444444,-73.9969472222222
     https://maps.googleapis.com/maps/api/geocode/json?latlng=50.456743,4.906151
     {
     "address_components" : [
     {
     "long_name" : "Brooklyn Bridge",
     "short_name" : "Brooklyn Bridge",
     "types" : [ "establishment", "point_of_interest", "premise" ]
     },
     {
     "long_name" : "Brooklyn Bridge Promenade",
     "short_name" : "Brooklyn Bridge Promenade",
     "types" : [ "route" ]
     },
     {
     "long_name" : "New York",
     "short_name" : "New York",
     "types" : [ "locality", "political" ]
     },
     {
     "long_name" : "New York",
     "short_name" : "NY",
     "types" : [ "administrative_area_level_1", "political" ]
     },
     {
     "long_name" : "États-Unis",
     "short_name" : "US",
     "types" : [ "country", "political" ]
     },
     {
     "long_name" : "10038",
     "short_name" : "10038",
     "types" : [ "postal_code" ]
     }
     ],
     "formatted_address" : "Brooklyn Bridge, Brooklyn Bridge Promenade, New York, NY 10038, États-Unis",
     "geometry" : {
     "bounds" : {
     "northeast" : {
     "lat" : 40.7079995,
     "lng" : -73.99441279999999
     },
     "southwest" : {
     "lat" : 40.7041437,
     "lng" : -73.99929109999999
     }
     },
     "location" : {
     "lat" : 40.7060716,
     "lng" : -73.9968519
     },
     "location_type" : "ROOFTOP",
     "viewport" : {
     "northeast" : {
     "lat" : 40.7079995,
     "lng" : -73.99441279999999
     },
     "southwest" : {
     "lat" : 40.7041437,
     "lng" : -73.99929109999999
     }
     }
     },
     "place_id" : "ChIJL5ip6DpawokRsW2csgwvn-g",
     "types" : [ "establishment", "point_of_interest", "premise" ]
     }
     */
    //console.log(address.formatted_address);

    var components={};
    jQuery.each(address.address_components, function(k,v1) {jQuery.each(v1.types, function(k2, v2){components[v2]=v1.long_name});});

    //console.log(components);
    if (typeof address.geometry.location.lat === 'function' && document.getElementById("location")) document.getElementById("location").value = address.geometry.location.lat()+','+address.geometry.location.lng();
    else if (document.getElementById("location"))   document.getElementById("location").value = address.geometry.location.lat+','+address.geometry.location.lng;
    if (document.getElementById("caption"))         document.getElementById("caption").value = address.formatted_address;
    if (document.getElementById("city"))            document.getElementById("city").value = components.locality;
    if (document.getElementById("ville"))           document.getElementById("ville").value = components.locality;
    if (document.getElementById("country"))         document.getElementById("country").value = components.country;
    if (document.getElementById("pays"))            document.getElementById("pays").value = components.country;
    if (document.getElementById("postal_code"))     document.getElementById("postal_code").value = components.postal_code;
    if (document.getElementById("code_postal"))     document.getElementById("code_postal").value = components.postal_code;
    if (document.getElementById("address") && components.route)              document.getElementById("address").value = components.route;
    if (document.getElementById("adresse") && components.route)              document.getElementById("adresse").value = components.route;
    if (document.getElementById("adresse_nr") && components.street_number)   document.getElementById("adresse_nr").value = components.street_number;
    if (document.getElementById("address_nr") && components.street_number)   document.getElementById("address_nr").value = components.street_number;

    // map?
    if (window.map) {
        if (typeof address.geometry.location.lat === 'function') var new_latlng = new window.google.maps.LatLng(address.geometry.location.lat(), address.geometry.location.lng());
        else var new_latlng = new window.google.maps.LatLng(address.geometry.location.lat,address.geometry.location.lng);
        window.map.setCenter(new_latlng);
        window.map.setZoom(17);
        window.marker ? window.marker.setPosition(new_latlng) : window.marker = new window.google.maps.Marker({
            position: new_latlng,
            map: window.map
        });
        if (document.getElementById("pac-input")) document.getElementById("pac-input").value = address.formatted_address;
    }

    document.getElementById("mj-loading").style.display = 'none';
    document.getElementById("mainLogoBox").getElementsByClassName('directus-logo').classList.add("static");
}

function MJreverseGeocode(lat,lng) {
    if (MJvalidateLatLng(lat) && MJvalidateLatLng(lng)) {
        document.getElementById("mj-loading").style.display = 'inline-block';
        document.getElementById("mainLogoBox").getElementsByClassName('directus-logo').classList.remove("static");
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng, function(data) {
            if (data && data.results && data.results.length>0) {
                setTimeout(function(){MJsetNewAddress(data.results[0]);}, 3000);
            } else {
                console.log('Reverse geocoding error...');
            }
        });
    } else {
        console.log('Bad latitude or longitude');
    }
}

function mj_extract_meta_fromfile(file) {console.log('mj_extract_meta_fromfile()');
    if (!file) return;
    console.log(file.type);

    // EXTRACT GPS DATA FROM PHOTOS
    if (file.type == 'image/jpeg' || file.type == 'image/png') {
        EXIF.getData(file, function() {
            var lng_raw = EXIF.getTag(this, 'GPSLongitude');
            if (lng_raw) {
                var lat_raw = EXIF.getTag(this, 'GPSLatitude');
                var lat_ref = EXIF.getTag(this, 'GPSLatitudeRef');
                var lng_ref = EXIF.getTag(this, 'GPSLongitudeRef');
                if (lng_raw.length>0) {
                    var lng = MJtoDecimal(lng_raw);
                    if (lng_ref == "W") lng = lng * -1;
                    var lat = MJtoDecimal(lat_raw);
                    if (lat_ref == "S") lat = lat * -1;
                    // confirm
                    if (window.map && window.marker) {
                        var r = confirm("Mettre à jour la localisation sur base de la photo?");
                        if (r == true) {
                            MJreverseGeocode(lat,lng);
                        }
                    } else {
                        MJreverseGeocode(lat,lng);
                    }
                }
            }
        });
    }

    // EXTRACT THUMBNAIL FROM PDF
    else if (file.type == 'application/pdf') {
        var reader  = new FileReader();
        reader.addEventListener("load", function(){ getThumbPDFFromUrl(reader.result); }, false);
        reader.readAsDataURL(file);
    }

    // EXTRACT THUMBNAIL FROM VIDEO (MP4)
    else if (file.type == 'video/mp4') {
        getThumbVideoFromUrl(URL.createObjectURL(file));
    }

}

function getThumbVideoFromUrl(url) {
    console.log('[VIDEO] getThumbVideoFromUrl()');
    var canvas = $('<canvas class=snapshot_generator></canvas>').appendTo(document.body)[0];
    var $video = $('<video muted class=snapshot_generator></video>').appendTo(document.body);
    var step_2_events_fired = 0;
    $video.one('loadedmetadata loadeddata suspend', function() {
        if (++step_2_events_fired == 3) {
            $video.one('seeked', function() {
                canvas.height = this.videoHeight;
                canvas.width = this.videoWidth;
                canvas.getContext('2d').drawImage(this, 0, 0);
                var img_src = canvas.toDataURL();

                console.log('[VIDEO] thumbnail done!');

                $img_el = $('#fileAddInput').siblings('.ui-file-container').find('.single-image-thumbnail').find('img');
                if ($img_el.length) var $img = $img_el.attr("src", img_src);

                $video.remove();
                $(canvas).remove();
            }).prop('currentTime', 1);
        }
    }).prop('src', url);
}

function getThumbPDFFromUrl(url) {
    console.log('[PDF] getThumbPDFFromUrl()');
    pdf_loading_task = PDFJS.getDocument(url);
    pdf_loading_task.then(function(pdf) {
        console.log('[PDF] Number of pages: '+pdf.numPages);
        pdf.getPage(1).then(function(page){
            var viewport = page.getViewport(0.5);
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext).then(function(){
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = "#fff";
                ctx.fillRect( 0, 0, canvas.width, canvas.height );
                var img_src = canvas.toDataURL();
                var $img = $('#fileAddInput').siblings('.ui-file-container').find('.single-image-thumbnail').find('img')
                    .attr("src", img_src);

                console.log('[PDF] thumbnail done!');

                canvas.remove();
                pdf_loading_task.destroy();
            });
        });
    });
}