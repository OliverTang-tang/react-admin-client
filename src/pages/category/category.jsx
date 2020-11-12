/**
 * Created by mqd on 2020/11/6.
 */

import React, {Component} from 'react'
import {Button, Card,Table} from "antd";
import {
    PlusCircleTwoTone,
} from '@ant-design/icons';
import LinkButton from "../../components/link-button/link-button";
/*商品分类*/

export default class Category extends Component {

    render() {
        const dataSource = [
            {
                key: '1',
                name: '文本',
            },
            {
                key: '2',
                name: '音乐',
            },
            {
                key: '3',
                name: '图片',
            },
            {
                key: '4',
                name: '视屏',
            },
        ];

        const columns = [
            {
                title: '种类',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width:300,
                render:()=>(
                   <span>
                       <LinkButton>修改分类</LinkButton>
                       <LinkButton>查看子分类</LinkButton>
                   </span>
                )
            },
        ];
        const title="一级分类"
        const extra=(
            <Button type={'primary'} icon={<PlusCircleTwoTone />}>添加</Button>
        )
        return (
                <Card title={title} extra={extra} >
                    <Table dataSource={dataSource}
                           columns={columns}
                           bordered
                           title={() => 'Header'}
                           footer={() => 'Footer'}/>;
                </Card>
        );
    }
}