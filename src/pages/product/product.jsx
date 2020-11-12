/**
 * Created by mqd on 2020/11/6.
 */

import React, {Component} from 'react';
import {message} from "antd";
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
/*
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
    host: 'localhost', port: 5001, protocol: 'http', apiPath: '/ipfs/api/v0'
    })// leaving out the arguments will default to these values
*/
//const IpfsHttpClient = require('ipfs-http-client')
//const { urlSource } = IpfsHttpClient
//const ipfs = IpfsHttpClient({ host: 'localhost', port: 5001 })

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memeHash: 'QmeqsLBetWQ1gRQc5VQup4pL3FCoAjfd3QAAGYaHn2p7sN',
            contract: null,
            web3: null,
            buffer: null,
            account: null
        }
    }


    captureFile = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) })
            console.log('buffer', this.state.buffer)
        }
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log("Submitting file to ipfs...")
        ipfs.add(this.state.buffer).then(rsp=>{
            console.log('Ipfs result', rsp);
            this.setState({ memeHash: rsp[0].hash })
        }).catch(err => console.error(err))


    }

    render() {
        return (
            <div> <img src={`https://ipfs.io/ipfs/${this.state.memeHash}`} />
                <p>&nbsp;</p>
                <h2>Change Meme</h2>
                <form onSubmit={this.onSubmit}>
                    <input type='file' onChange={this.captureFile} />
                    <input type='submit' />
                </form>
            </div>
        );
    }
}