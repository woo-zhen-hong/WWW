import React, { useEffect, useState } from 'react';
import { Tabs, Upload, Layout, Modal, Row, Col, Button, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import { Column, Pie, DualAxes } from '@ant-design/plots';
const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
];
const Charts = () => {
    return (
        <>
            <Col apn={24}>
                <Row gutter={[8, 8]} justify={'end'}>
                    <Col span={24} style={{ fontSize: '2rem' }}>數據化圖表</Col>
                    <Col span={24}>
                        <Tabs
                            // onChange={onChange}
                            type="card"
                            items={[{
                                key: 1,
                                label: '全部',
                                children: (<>
                                    <Col span={24}>
                                        <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                                            <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月欠還款情形</Col>
                                            <Col span={12}>
                                                <Row gutter={[8, 8]}>
                                                    <Col span={24}>
                                                        <DemoColumn />
                                                    </Col>
                                                    <Col span={24}>
                                                        <DemoDualAxes />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <DemoPie />
                                            </Col>
                                        </Row>
                                    </Col>
                                </>),
                            }, {
                                key: 2,
                                label: '欠款資訊',
                                children: (<>
                                    <Col span={24}>
                                        <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                                            <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月欠還款情形</Col>
                                            <Col span={12}>
                                                <Row gutter={[8, 8]}>
                                                    <Col span={24}>
                                                        <DemoColumn />
                                                    </Col>
                                                    <Col span={24}>
                                                        <DemoDualAxes />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <DemoPie />
                                            </Col>
                                        </Row>
                                    </Col>
                                </>),
                            }, {
                                key: 3,
                                label: '還款資訊',
                                children: (<>
                                    <Col span={24}>
                                        <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                                            <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月欠還款情形</Col>
                                            <Col span={12}>
                                                <Row gutter={[8, 8]}>
                                                    <Col span={24}>
                                                        <DemoColumn />
                                                    </Col>
                                                    <Col span={24}>
                                                        <DemoDualAxes />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <DemoPie />
                                            </Col>
                                        </Row>
                                    </Col>
                                </>),
                            }]}
                        />
                    </Col>
                </Row>

            </Col>
        </>
    )
}
export default Charts;
const DemoColumn = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        isGroup: true,
        xField: '月份',
        yField: '月均降雨量',
        seriesField: 'name',
        
        dodgePadding: 2,
        label: {
            position: 'middle',
            layout: [
                
                {
                    type: 'interval-adjust-position',
                }, 
                {
                    type: 'interval-hide-overlap',
                }, 
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    return <Column {...config} />;
};


const DemoPie = () => {
    const data = [
        {
            type: '一月',
            value: 2,
        },
        {
            type: '二月',
            value: 5,
        },
        {
            type: '三月',
            value: 1,
        },
        {
            type: '四月',
            value: 1,
        },
        {
            type: '五月',
            value: 4,
        },
        {
            type: '六月',
            value: 5,
        },
        {
            type: '七月',
            value: 2,
        },{
            type: '八月',
            value: 5,
        },{
            type: '九月',
            value: 0,
        },{
            type: '十月',
            value: 1,
        },{
            type: '十一月',
            value: 2,
        },{
            type: '十二月',
            value: 3,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: '',
            },
        },
    };
    return <Pie {...config} />;
};
const DemoDualAxes = () => {
    const data = [
        {
            year: '01',
            value: 2,
            count: 10,
        },
        {
            year: '02',
            value: 5,
            count: 4,
        },
        {
            year: '03',
            value: 1,
            count: 5,
        },
        {
            year: '04',
            value: 1,
            count: 5,
        },
        {
            year: '05',
            value: 4,
            count: 4.9,
        },
        {
            year: '06',
            value: 5,
            count: 35,
        },
        {
            year: '07',
            value: 2,
            count: 7,
        },
        {
            year: '08',
            value: 5,
            count: 1,
        },
        {
            year: '09',
            value: 0,
            count: 20,
        },
        {
            year: '10',
            value: 1,
            count: 20,
        },
        {
            year: '11',
            value: 2,
            count: 20,
        },
        {
            year: '12',
            value: 3,
            count: 20,
        },
    ];
    const config = {
        data: [data, data],
        xField: 'year',
        yField: ['value', 'count'],
        geometryOptions: [
            {
                geometry: 'line',
                color: '#5B8FF9',
            },
            {
                geometry: 'line',
                color: '#5AD8A6',
            },
        ],
    };
    return <DualAxes {...config} />;
};
