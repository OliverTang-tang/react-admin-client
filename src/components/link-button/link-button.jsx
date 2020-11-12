/**
 * Created by mqd on 2020/11/7.
 */

import React, {Component} from 'react';
import './linkButton.css'

export default class LinkButton extends Component
{
    render()
    {
        return <button {...this.props} className="link-button"></button>;
    }
}