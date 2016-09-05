import GoogleMapsLoader from 'google-maps';

export default {
    init (root, refs) {
        root.style.width = '100%';
        root.style.height = '100%';

        GoogleMapsLoader.KEY = 'AIzaSyD1V5W5JSnpzfIMnRUOXDhqf18SUdpCnfM';
        GoogleMapsLoader.LIBRARIES = ['places'];

        GoogleMapsLoader.load(google => {
            let latLng = { lat: 59.9138757, lng: 10.7437105 };

            let map = new google.maps.Map(root, {
                center: latLng,
                zoom: 15,
                disableDefaultUI: true,
                // scrollwheel: false
            });

            let marker = new google.maps.Marker({
                position: latLng,
                map: map
            });

            let infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(`
                <strong>FINN.no</strong><br>
                Grensen 5-7, 0182 Oslo<br>
                <a href="https://goo.gl/maps/Z7DBoe3Z6kD2" target="_blank">View on Google Maps</a>
            `);
            infoWindow.open(map, marker);
            marker.addListener('click', function() {
              infoWindow.open(map, marker);
            });
        });

    }
};
