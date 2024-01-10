var NR_Map_Address_Editor_View=function(){function e(){this.initEvents()}var t=e.prototype;return t.initEvents=function(){var t=this,i=this;document.addEventListener("onTFMapContextMenuAddMarker",function(e){var t,r,a=e.detail.map;a.classList.contains("map-address-editor-view")&&(e=e.detail.e.latlng,e=i.addMarker(a,e.lat,e.lng,"","",!1),t=parseInt(i.getMaxMarkers(a)),r=parseInt(a.OpenStreetMap.options.markers.length),a.OpenStreetMap.options.pro||1!==t?a.OpenStreetMap.options.pro&&t<=r&&a.OpenStreetMap.map.contextmenu&&a.OpenStreetMap.map.contextmenu.disable():a.OpenStreetMap.map.contextmenu&&a.OpenStreetMap.map.contextmenu.disable(),a.querySelector(".tf-mapeditor-add-new-marker")&&i.addMarkerToList(e,a),t===r&&a.classList.add("markers-limit-reached"),a.classList.remove("clear-is-hidden"),i.scrollToTheBottomOfTheMarkersList(a))}),document.addEventListener("onTFMapWidgetRender",function(e){var t,r,e=e.detail.map;e.classList.contains("map-address-editor-view")&&(t=e.OpenStreetMap,i.determineFieldValidityAndToggleValidatorField(e),r=i.getMaxMarkers(e),(t.options.pro||!t.options.pro&&0===t.options.markers.length)&&t.map.contextmenu&&t.map.contextmenu.enable(),t.options.pro&&r<=t.options.markers.length&&t.map.contextmenu&&t.map.contextmenu.disable(),t.markers_draggable=!0,t.map.on("click",function(e){t.map.contextmenu.hide(),1===t.options.markers.length&&1===r&&i.updateMarkerByIndex(t,e.latlng.lat,e.latlng.lng)}))}),document.addEventListener("onTFMapMarkerCreate",function(t){var r;t.detail.map.classList.contains("map-address-editor-view")&&((r=t).detail.markerMap.on("dblclick",function(){var e=r.detail.markerProps.id;document.querySelector('.tf-map-markers--list--item[data-id="'+e+'"]').querySelector(".tf-map-markers--list--item--actions--edit").click()}),t.detail.markerMap.on("movestart",function(){t.detail.markerMap.closeTooltip(),t.detail.markerMap.closePopup()}),t.detail.markerMap.on("moveend",function(){var e=t.detail.markerMap.getLatLng();i.getAddressDetails(e.lat,e.lng,t.detail.map,i.onAfterGetAddressDetails.bind(i),t.detail.markerProps),t.detail.map.OpenStreetMap.options.pro&&t.detail.map.OpenStreetMap.map.contextmenu.hide()}),t.detail.map.closest(".tf-mapaddress-editor")||t.detail.markerMap.bindContextMenu({contextmenu:!0,contextmenuInheritItems:!1,contextmenuItems:[{text:window.parent.Joomla.Text._("NR_EDIT_MARKER"),index:0,callback:function(e){e=e.relatedTarget.options.id,e=document.querySelector('.tf-map-markers--list--item[data-id="'+e+'"]');e&&e.querySelector(".tf-map-markers--list--item--actions--edit").click()}},{separator:!0,index:1},{text:window.parent.Joomla.Text._("NR_DELETE_MARKER"),index:2,callback:function(e){e=e.relatedTarget.options.id,e=document.querySelector('.tf-map-markers--list--item[data-id="'+e+'"]');e&&e.querySelector(".tf-map-markers--list--item--actions--delete").click()}}]}))}),Joomla.Modal?(document.addEventListener("show.bs.modal",function(e){i.onBeforeShowEditMarkerModal(e)}),document.addEventListener("shown.bs.modal",function(e){i.onEditMarker(e),i.onShowAddMarkerModal(e)})):(jQuery(document).on("show.bs.modal",function(e){i.onBeforeShowEditMarkerModal(e)}),jQuery(document).on("shown.bs.modal",function(e){i.onEditMarker(e),i.onShowAddMarkerModal(e)})),document.addEventListener("click",function(e){this.onClearMap(e),this.onBeforeShowAddMarkerModal(e),this.onSaveNewMarker(e),this.onEditMarkerClick(e),this.onDeleteMarker(e),this.onSaveExistingMarker(e)}.bind(this)),document.addEventListener("onTFAddressLookupSelectedItem",function(e){this.onSelectAutocompleteItem(e)}.bind(this)),document.querySelectorAll("joomla-field-subform").forEach(function(e){e.closest(".nrf-map-widget.map-address-editor-view")||e.addEventListener("subform-row-add",function(e){t.renderOnSubform(e)})})},t.addMarkerOnMapClick=function(e){var t,r=e.target._container.closest(".nrf-widget.openstreetmap"),a=r.OpenStreetMap;0===a.options.markers.length?(t=this.addMarker(r,e.latlng.lat,e.latlng.lng,"","",!1),r.querySelector(".tf-mapeditor-add-new-marker")&&this.addMarkerToList(t,r)):0<a.options.markers.length&&1<this.getMaxMarkers(r)&&(t=this.addMarker(r,e.latlng.lat,e.latlng.lng,"","",!1),r.querySelector(".tf-mapeditor-add-new-marker"))&&this.addMarkerToList(t,r),this.scrollToTheBottomOfTheMarkersList(r)},t.onBeforeShowAddMarkerModal=function(e){var t,e=e.target.closest(".tf-mapeditor-add-new-marker");e&&((t=document.querySelector("#tfMapEditorMarkerAddModal")).querySelector(".tf-address-lookup-field-address").value="",t.querySelector(".tf-marker-repeater-latitude").value="",t.querySelector(".tf-marker-repeater-longitude").value="",document.querySelectorAll('.nrf-widget.map-address-editor-view[data-adding-new-marker="true"]').forEach(function(e){e.removeAttribute("data-adding-new-marker")}),e.closest(".nrf-widget.map-address-editor-view").setAttribute("data-adding-new-marker",!0))},t.onSaveNewMarker=function(e){var t,r=e.target.closest(".tf-mapeditor-save-new-marker");r&&(t=document.querySelector('.nrf-widget.map-address-editor-view[data-adding-new-marker="true"]'),e.preventDefault(),""===(r={latitude:(e=r.closest("#tfMapEditorMarkerAddModal")).querySelector(".tf-marker-repeater-latitude").value,longitude:e.querySelector(".tf-marker-repeater-longitude").value}).latitude&&""===r.longitude||(e=this.addMarker(t,r.latitude,r.longitude,"","",!0),this.addMarkerToList(e,t),this.scrollToTheBottomOfTheMarkersList(t),t.OpenStreetMap.centerMap(),t.removeAttribute("data-adding-new-marker"),t.classList.remove("clear-is-hidden"),parseInt(this.getMaxMarkers(t))===parseInt(t.OpenStreetMap.options.markers.length)&&t.OpenStreetMap.map.contextmenu.disable()))},t.scrollToTheBottomOfTheMarkersList=function(e){e=e.querySelector(".tf-map-markers--list");e&&(e.scrollTop=e.scrollHeight)},t.addMarkerToList=function(e,t){var r=t.querySelector(".tf-map-markers--list--item.is-template").cloneNode(!0),e=(r.classList.remove("is-template","is-hidden"),r.setAttribute("data-id",e.options.id),t.querySelectorAll(".tf-map-markers--list .tf-map-markers--list--item").length),e=(r.querySelector(".tf-map-markers--list--item--label--wrapper--counter").innerHTML=e+1+".",t.querySelector(".tf-map-markers--list"));0===e.querySelectorAll(".tf-map-markers--list--item").length&&(e.innerHTML=""),e.appendChild(r)},t.onShowAddMarkerModal=function(e){e=e.target.closest("#tfMapEditorMarkerAddModal");e&&(e.matches(".fade.in")||e.matches(".fade.show"))&&e.querySelector(".tf-address-lookup-field-address").focus()},t.onBeforeShowEditMarkerModal=function(e){e=e.target.closest("#tfMapEditorMarkerEditModal");e&&(e.querySelector(".tf-marker-repeater-id").value="",e.querySelector(".tf-address-lookup-field-address").value="",e.querySelector(".tf-marker-repeater-latitude").value="",e.querySelector(".tf-marker-repeater-longitude").value="",e.querySelector(".tf-marker-repeater-label").value="",e.querySelector(".tf-marker-repeater-description").value="")},t.onEditMarkerClick=function(e){var t,e=e.target.closest(".tf-map-markers--list--item--actions--edit");e&&(t=e.closest(".nrf-widget.map-address-editor-view"))&&((t=t.querySelector(".tf-map-markers--list--item[data-clicked]"))&&t.removeAttribute("data-clicked"),e.closest(".tf-map-markers--list--item").setAttribute("data-clicked",!0))},t.onEditMarker=function(e){var t,r,a,e=e.target.closest("#tfMapEditorMarkerEditModal");e&&(e.matches(".fade.in")||e.matches(".fade.show"))&&(t=(a=document.querySelector('.tf-map-markers--list--item[data-clicked="true"]')).closest(".nrf-widget.map-address-editor-view"),a.removeAttribute("data-clicked"),e.querySelectorAll("input").forEach(function(e){e.removeAttribute("name")}),e.querySelectorAll("textarea").forEach(function(e){e.removeAttribute("name")}),t=t.OpenStreetMap.options.markers,r=parseInt(a.dataset.id),a=t.filter(function(e){return e.id===r}))&&(e.querySelector(".tf-marker-repeater-id").value=r,e.querySelector(".tf-address-lookup-field-address").value=a[0].address,e.querySelector(".tf-marker-repeater-latitude").value=a[0].latitude,e.querySelector(".tf-marker-repeater-longitude").value=a[0].longitude,e.querySelector(".tf-marker-repeater-label").value=a[0].label,e.querySelector(".tf-marker-repeater-description").value=a[0].description)},t.onSaveExistingMarker=function(e){var t,r,e=e.target.closest(".tf-mapeditor-save-marker");e&&(e=e.closest(".modal"),r=parseInt(e.querySelector(".tf-marker-repeater-id").value),t=document.querySelector('.tf-map-markers--list--item[data-id="'+r+'"]').closest(".nrf-widget.map-address-editor-view"),r={id:r,address:e.querySelector(".tf-address-lookup-field-address").value,latitude:e.querySelector(".tf-marker-repeater-latitude").value,longitude:e.querySelector(".tf-marker-repeater-longitude").value,label:e.querySelector(".tf-marker-repeater-label").value,description:e.querySelector(".tf-marker-repeater-description").value},this.updateMarkerByID(t.OpenStreetMap,r.latitude,r.longitude,r.address,r.label,r.description,r.id),this.updateMapMarkersValue(t,r),this.updateMarkersList(t),t.OpenStreetMap.centerMap(),t.classList.remove("clear-is-hidden"))},t.onDeleteMarker=function(e){var t=e.target.closest(".tf-map-markers--list--item--actions--delete");t&&(e.preventDefault(),confirm(window.parent.Joomla.Text._("NR_ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_MARKER")))&&(e=t.closest(".nrf-widget.map-address-editor-view"),t=parseInt(t.closest(".tf-map-markers--list--item").dataset.id),this.deleteMarkerById(t,e),0===e.OpenStreetMap.options.markers.length&&(e.querySelector(".tf-mapeditor-add-new-marker").classList.remove("is-hidden"),e.querySelector(".tf-map-markers--list").innerHTML=e.querySelector(".tf-map-markers").dataset.noMarkers,e.classList.add("clear-is-hidden")),this.fixMarkersListCounter(e),this.determineFieldValidityAndToggleValidatorField(e),e.OpenStreetMap.centerMap(),t=this.getMaxMarkers(e),e.OpenStreetMap.options.markers.length<t)&&(e.classList.remove("markers-limit-reached"),e.OpenStreetMap.map.contextmenu.enable())},t.fixMarkersListCounter=function(e){e.querySelectorAll(".tf-map-markers--list .tf-map-markers--list--item").forEach(function(e,t){e.querySelector(".tf-map-markers--list--item--label--wrapper--counter").innerHTML=t+1+"."})},t.renderOnSubform=function(e){e.target.querySelectorAll(".nrf-widget.map-address-editor-view:not(.no-map):not(.done)").forEach(function(e){var t=new NR_OSM_Map(e);t.render(),t.renderMarkers(),t.centerMap(),e.classList.add("done")})},t.addNewMarkerAtCenter=function(e){var t,e=e.closest(".nrf-widget.map-address-editor-view");if(e)return t=e.OpenStreetMap.map.getCenter(),t=this.addMarker(e,t.lat,t.lng,"","",!1),this.determineFieldValidityAndToggleValidatorField(e),t},t.deleteMarkerById=function(t,e){var r=e.OpenStreetMap,a=r.markersObjects.filter(function(e){return e.options.id===t});0!==a.length&&(r.deleteMarker(a[0]),this.deleteMapMarkerFromValue(e,t),r=e.querySelector('.tf-map-markers--list--item[data-id="'+t+'"]'))&&r.remove()},t.onAfterGetAddressDetails=function(e,t,r,a,i){var o=new CustomEvent("onTFMapEditorMarkerMoveEnd",{detail:{map:a,coords:{lat:t,lng:r},address:e}}),o=(document.dispatchEvent(o),"display_name"in e?e.display_name:window.parent.Joomla.Text._("NR_UNKNOWN_LOCATION")),e=this.getSavedMarkerByID(i.id,a),i=a.querySelector(".tf-address-lookup-field-address"),i=(i&&(i.value=o),Object.assign({},e,{latitude:t,longitude:r,address:o}));this.updateMapMarkersValue(a,i),this.updateMarkersList(a),this.determineFieldValidityAndToggleValidatorField(a),a.OpenStreetMap&&a.OpenStreetMap.updateMarkers()},t.updateMarkersList=function(e){var a,t=e.querySelectorAll(".tf-map-markers--list .tf-map-markers--list--item");t&&(a=e.OpenStreetMap.options.markers,t.forEach(function(e){var t=parseInt(e.dataset.id),r=a.filter(function(e){return e.id===t});r&&(r=r[0].label&&""!==r[0].label.trim()?r[0].label.trim():r[0].address||!1)&&(e.querySelector(".tf-map-markers--list--item--label--wrapper--label").innerHTML=r)}))},t.getAddressDetails=function(t,r,a,i,o){void 0===o&&(o=""),fetch("https://nominatim.openstreetmap.org/reverse?lat="+t+"&lon="+r+"&addressdetails=1&format=json").then(function(e){return e.json()}).then(function(e){i(e,t,r,a,o)})},t.updateMarkerByIndex=function(e,t,r,a,i,o,d){void 0===i&&(i=null),void 0===o&&(o=null),void 0===d&&(d=0),null!==(a=void 0===a?null:a)&&(e.options.markers[d].address=a),e.options.markers[d].latitude=t,e.options.markers[d].longitude=r,e.options.markers[d].label=i,e.options.markers[d].description=o,e.updateMarkers(),e.markersObjects[d].fire("moveend")},t.updateMarkerByID=function(e,t,r,a,i,o,d){for(var n in void 0===a&&(a=null),void 0===i&&(i=null),void 0===o&&(o=null),void 0===d&&(d=null),e.options.markers)e.options.markers[n].id===d&&(null!==a&&(e.options.markers[n].address=a),e.options.markers[n].latitude=t,e.options.markers[n].longitude=r,e.options.markers[n].label=i,e.options.markers[n].description=o);e.updateMarkers()},t.addMarker=function(e,t,r,a,i,o){void 0===o&&(o=!0);t=e.OpenStreetMap.afterMarkerCreate({latitude:t,longitude:r,label:a=void 0===a?"":a,description:i=void 0===i?"":i});return e.OpenStreetMap.map.addLayer(t),o&&e.OpenStreetMap.centerMap(),t.fire("moveend"),e.querySelector(".map-markers").value=JSON.stringify(e.OpenStreetMap.options.markers),this.getMaxMarkers(e)===e.OpenStreetMap.options.markers.length&&e.classList.add("markers-limit-reached"),t},t.getSavedMarkerByID=function(t,e){e=e.OpenStreetMap.options.markers.filter(function(e){return e.id===t});if(e)return e[0]},t.getMaxMarkers=function(e){e=JSON.parse(e.dataset.options)||{},e="max_markers"in e?parseInt(e.max_markers):1;return e=0===e?9999:e},t.debounce=function(r,a){var i;return function(){var e=this,t=arguments;clearTimeout(i),i=setTimeout(function(){return r.apply(e,t)},a)}},t.onClearMap=function(e){var t=e.target.closest(".tf-map-editor-clear");t&&(e.preventDefault(),confirm(window.parent.Joomla.Text._("NR_ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_MARKERS")))&&((e=t.closest(".nrf-widget.map-address-editor-view")).classList.add("clear-is-hidden"),e.classList.remove("markers-limit-reached"),t=e.OpenStreetMap.options.markers.length,this.deleteMarkers(e),t=e.OpenStreetMap.options.markers.length,e.OpenStreetMap&&0===t&&((t=e.querySelector(".tf-mapeditor-add-new-marker"))&&t.classList.remove("is-hidden"),e.querySelector(".tf-map-markers--list"))&&(e.querySelector(".tf-map-markers--list").innerHTML=e.querySelector(".tf-map-markers").dataset.noMarkers),e.OpenStreetMap&&e.OpenStreetMap.map.contextmenu.enable(),this.determineFieldValidityAndToggleValidatorField(e),t=new CustomEvent("onTFMapEditorClearMap",{detail:{map:e}}),document.dispatchEvent(t))},t.deleteMarkers=function(e){if(e.OpenStreetMap)for(;0<e.OpenStreetMap.options.markers.length;){var t=parseInt(e.OpenStreetMap.options.markers[0].id);this.deleteMarkerById(t,e)}},t.hideAutocompleteResult=function(e){e.classList.remove("is-visible"),e.innerHTML=""},t.onSelectAutocompleteItem=function(e){var t,r,a,i,o,d,n=e.detail.item.closest(".nrf-widget.map-address-editor-view");n&&(t=e.detail.lat,r=e.detail.lng,a=this.getOpenedMarkerModal(),n&&n.OpenStreetMap&&(1===this.getMaxMarkers(n)?0===n.OpenStreetMap.options.markers.length?a?this.updateMarkerModalWithValues(a,{latitude:t,longitude:r,address:e.detail.address}):this.addMarker(n,t,r):a?(i=e.detail.item.closest(".modal"),this.updateMarkerModalWithValues(i,{latitude:t,longitude:r,address:e.detail.address})):this.updateMarkerByIndex(n.OpenStreetMap,t,r):(i=e.detail.item.closest(".modal"),a?(d={latitude:t,longitude:r,address:e.detail.address},this.updateMarkerModalWithValues(i,d)):(o=parseInt(i.querySelector(".tf-marker-repeater-id").value),this.updateMarkerByID(n.OpenStreetMap,t,r,e.detail.address,null,null,o),1===(d=n.OpenStreetMap.markersObjects.filter(function(e){return e.options.id===o})).length&&(d[0].fire("moveend"),n.OpenStreetMap.updateMarkers()))),a||n.OpenStreetMap.centerMap()),n.OpenStreetMap.map.contextmenu)&&n.OpenStreetMap.map.contextmenu.disable()},t.updateMarkerModalWithValues=function(e,t){e.querySelector(".tf-address-lookup-field-coordinates-value")&&(e.querySelector(".tf-address-lookup-field-coordinates-value").value=[t.latitude,t.longitude].join(",")),e.querySelector(".tf-address-lookup-field-address").value=t.address,e.querySelector(".tf-marker-repeater-latitude").value=t.latitude,e.querySelector(".tf-marker-repeater-longitude").value=t.longitude},t.getOpenedMarkerModal=function(){var e=document.querySelector("#tfMapEditorMarkerEditModal.fade.show");return e=e||document.querySelector("#tfMapEditorMarkerEditModal.fade.in"),e||(document.querySelector("#tfMapEditorMarkerAddModal.fade.show")||document.querySelector("#tfMapEditorMarkerAddModal.fade.in"))},t.getMaps=function(){return document.querySelectorAll(".nrf-widget.map-address-editor-view:not(.done)")},t.syncMapMarkersToInstanceMarkers=function(e){var t=e.OpenStreetMap.options.markers;e.querySelector(".map-markers").value=JSON.stringify(t)},t.updateMapMarkersValue=function(e,t){var r=e.querySelector(".map-markers").value,a=[];if(0===(a=""!==r?JSON.parse(r)||[]:a).length)a=[t];else for(var i in a)a[i].id===t.id&&(a[i]=t);e.OpenStreetMap.options.markers=a,e.querySelector(".map-markers").value=JSON.stringify(a)},t.deleteMapMarkerFromValue=function(e,t){var r,a=e.querySelector(".map-markers").value,i=[];for(r in i=""!==a?JSON.parse(a)||[]:i)i[r].id===t&&i.splice(r,1);e.querySelector(".map-markers").value=JSON.stringify(i)},t.determineFieldValidityAndToggleValidatorField=function(e){var t;this.isRequired(e)&&e.OpenStreetMap&&(t=0!==e.OpenStreetMap.options.markers.length?"hide":"show",e=e.querySelector(':scope > input[type="hidden"].required'),"hide"==t?(e.removeAttribute("required"),e.classList.remove("required")):(e.setAttribute("required","required"),e.classList.add("required")))},t.isRequired=function(e){return!!e.querySelector(':scope > input[type="hidden"].required')},e}();document.addEventListener("DOMContentLoaded",function(){new NR_Map_Address_Editor_View});
