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
        // 分组柱状图 组内柱子间的间距 (像素级别)
        dodgePadding: 2,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
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
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
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
            year: '1991',
            value: 3,
            count: 10,
        },
        {
            year: '1992',
            value: 4,
            count: 4,
        },
        {
            year: '1993',
            value: 3.5,
            count: 5,
        },
        {
            year: '1994',
            value: 5,
            count: 5,
        },
        {
            year: '1995',
            value: 4.9,
            count: 4.9,
        },
        {
            year: '1996',
            value: 6,
            count: 35,
        },
        {
            year: '1997',
            value: 7,
            count: 7,
        },
        {
            year: '1998',
            value: 9,
            count: 1,
        },
        {
            year: '1999',
            value: 13,
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
