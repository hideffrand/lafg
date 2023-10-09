import Iframe from 'react-iframe';

export default function GoogleMaps() {
  return (
    <div className="maps" id='maps'>
        <h3>Lokasi</h3>
        <Iframe
          url="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Jl.%20Bandulan%2014%20No.242,%20Malang.&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          width="100%"
          height="200px"
          id="gmap_canvas"
        />
    </div>
  );
}

