import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { Component } from 'react';

  class GPS extends Component {


    constructor (props) {
    super(props);
    this.state = {
        lat : 108,
    }
    }


    componentDidMount() {
    setInterval(
        () => this.tick(),
        1000
    );
    }

    tick() {
        this.setState({
            lat : this.state.lat+0.0001,
        })
    }
    
    render(){
    // console.log([this.state.container_zoom]);
        return (
            <div className='h-[90vh] m-auto'>
              <MapContainer className='h-[90vh]' center={[0.9731, 116.7077]} zoom={6} scrollWheelZoom={true}>
                    {/* <LocationMarker tes={this.state.thisbound}/> */}
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    // change a folder maps
                    // url="./TuzGolu/{z}/{x}/{y}.png"
                    
                    //aksaray-ankara maps
                    // url="./Aksaray/{z}/{x}/{y}.png"

                    //online map
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline positions={this.props.data} />
                    {/* <CircleMarker center={[this.state.container_lat, this.state.container_long]} fillOpacity="1" pathOptions={fillRedOptions}  color="#FF5252" radius={5} />
                    <CircleMarker center={[this.state.payload_lat, this.state.payload_long]} fillOpacity="1" pathOptions={fillBlueOptions} color="#96A0FF" radius={5} /> */}
                </MapContainer>
            </div>
        );
    }
    
}

export default GPS;