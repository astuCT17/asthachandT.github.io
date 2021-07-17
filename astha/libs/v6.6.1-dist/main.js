window.onload = init; 

// baseMapGroup 
var baseMapGroup = new ol.layer.Group({
    title: 'Choose the base map',
    layers: [
        new ol.layer.Tile({
            title: 'Bing Maps',
            type: 'base',
            visible: false,
            source: new ol.source.BingMaps({
                key: 'AuuAUPUJCt9KcDBOEF8g1BF-2bliglDNizh5vuGg6JTO1HAULoA10A6XOUn78BmZ',
                imagerySet: 'AerialWithLabelsOnDemand'
            })
        }),
        new ol.layer.Tile({
            title: 'Open Street Maps',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        })
    ]
});

// rasterMapGroup
var rasterMapGroup =  new ol.layer.Group({
    title: 'Raster Data',
    layers: [
        new ol.layer.Image({
            title: 'NEPAL SRTM DEM',
            visible: false,
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                    'LAYERS': 'gis:NepalSRTM90m'
                },
                serverType: 'geoserver',
            })
        }),

        new ol.layer.Image({
            title: 'Landcover Map Of Nepal',
            visible: false,
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                    'LAYERS': 'webgis:LC_2010'
                },
                serverType: 'geoserver',
            })
        }),
    ]
});




// adminunit 
var adminGrup = new ol.layer.Group({
    title: 'Administrative Maps',
    layers: [
        new ol.layer.Image({
            title: 'Municipilality',
            visible: false,
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                    'LAYERS': 'PostgreSQL:municipality'
                },
                serverType: 'geoserver',
            })
        }),
    ]
});

// Highwayunit 
var HighwayMapGroup = new ol.layer.Group({
    title: 'Highway Map Of Nepal',
    layers: [
        new ol.layer.Image({
            title: 'Highway',
            visible: false,
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                    'LAYERS': 'PostgreSQL:export_output'
                },
                serverType: 'geoserver',
            })
        }),
    ]
});


function init() {
    const map = new ol.Map({
        view: new ol.View({
             center: ol.proj.transform([84.08906, 28.41069], 'EPSG:4326', 'EPSG:3857'),
            zoom:7
        }),
        layers: [baseMapGroup, rasterMapGroup, populationMapGroup, adminGrup,HighwayMapGroup],
         target: 'js-map'
        
    })

    var layerSwitcher = new ol.control.LayerSwitcher ({
        tipLable: "Legend",
        reverse: true,
          groupSelectStyle:'group',
        
    });
    map.addControl(layerSwitcher);
}


