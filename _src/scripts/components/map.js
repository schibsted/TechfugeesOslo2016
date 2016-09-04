import GoogleMapsLoader from 'google-maps';

export default {
    init (ele, refs) {

        GoogleMapsLoader.KEY = 'AIzaSyD1V5W5JSnpzfIMnRUOXDhqf18SUdpCnfM';

        GoogleMapsLoader.load(google => {
            let latLng = { lat: 59.9138757, lng: 10.7437105 };

            let map = new google.maps.Map(ele, {
                center: latLng,
                zoom: 17,
                disableDefaultUI: true,
                scrollwheel: false
            });

            let marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: 'FINN.no'
            });
        });

    }
}
