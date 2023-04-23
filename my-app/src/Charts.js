import React, { useEffect, useState } from 'react';
import { Tabs, Upload, Layout, Modal, Row, Col, Button, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import { Column, Pie, DualAxes } from '@ant-design/plots';
import styled from 'styled-components';
const CustomTabs = styled.div`
    .ant-tabs-tab{
        color: #bbb;
        font-size :1rem;
        font-weight: 400;
        border-radius: 10px;
        // background-color: #D9B3B3;
        background: linear-gradient(-60deg, transparent 20px, white 0) right,
        linear-gradient(120deg, transparent 20px, white 0) left;
        background-color: transparent;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active{
        font-size :1.5rem;
        font-weight: 700;
        background-color: #A6B3D2 !important;

    }
    .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab{
      padding:10px;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
      color:#FFFFFF;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab{
    //   background:#FFF4C1;
      font-size :1rem;
    }
    .ant-tabs-tab:hover {
        color: #gray;
        background: #FFF
        transform:scale(1.2)
    }
    .ant-tabs-tab-btn:focus, .ant-tabs-tab-remove:focus, .ant-tabs-tab-btn:active, .ant-tabs-tab-remove:active {
        color: #FFF;
    }
`;
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
            <CustomTabs>
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
                                                <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月欠款情形</Col>
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
                                                <Col span={24} style={{ fontSize: '2rem', textAlign: 'center' }}>1-12月還款情形</Col>
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
            </CustomTabs>
        </>
    )
}
export default Charts;
const DemoColumn = () => {
    const [data, setData] = useState([
        {
            "name": "欠款",
            "月份": "Jan.",
            "月均降雨量": 200
        },
        {
            "name": "收款",
            "月份": "Jan.",
            "月均降雨量": 50
        },
        {
            "name": "欠款",
            "月份": "Feb.",
            "月均降雨量": 250
        },
        {
            "name": "收款",
            "月份": "Feb.",
            "月均降雨量": 150
        },
        {
            "name": "欠款",
            "月份": "Mar.",
            "月均降雨量": 100
        },
        {
            "name": "收款",
            "月份": "Mar.",
            "月均降雨量": 0
        },
        {
            "name": "欠款",
            "月份": "Apr.",
            "月均降雨量": 150
        },
        {
            "name": "收款",
            "月份": "Apr.",
            "月均降雨量": 150
        },
        {
            "name": "欠款",
            "月份": "May",
            "月均降雨量": 100
        },
        {
            "name": "收款",
            "月份": "May.",
            "月均降雨量": 200
        },
        {
            "name": "欠款",
            "月份": "Jun.",
            "月均降雨量": 50
        },
        {
            "name": "收款",
            "月份": "Jun.",
            "月均降雨量": 150
        },
        {
            "name": "欠款",
            "月份": "Jul.",
            "月均降雨量": 100
        },
        {
            "name": "收款",
            "月份": "Jul.",
            "月均降雨量": 170
        },
        {
            "name": "欠款",
            "月份": "Aug.",
            "月均降雨量": 250
        },
        {
            "name": "收款",
            "月份": "Aug.",
            "月均降雨量": 50
        },
        {
            "name": "欠款",
            "月份": "Sep.",
            "月均降雨量": 100
        },
        {
            "name": "收款",
            "月份": "Sep.",
            "月均降雨量": 200
        },
        {
            "name": "欠款",
            "月份": "Oct.",
            "月均降雨量": 180
        },
        {
            "name": "收款",
            "月份": "Oct.",
            "月均降雨量": 130
        },
        {
            "name": "欠款",
            "月份": "Nov.",
            "月均降雨量": 190
        },
        {
            "name": "收款",
            "月份": "Nov.",
            "月均降雨量": 150
        },
        {
            "name": "欠款",
            "月份": "Dec.",
            "月均降雨量": 50
        },

        {
            "name": "收款",
            "月份": "Dec.",
            "月均降雨量": 150
        },

    ]);



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
        }, {
            type: '八月',
            value: 5,
        }, {
            type: '九月',
            value: 0,
        }, {
            type: '十月',
            value: 1,
        }, {
            type: '十一月',
            value: 2,
        }, {
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
            value: 200,
            count: 50,
        },
        {
            year: '02',
            value: 250,
            count: 150,
        },
        {
            year: '03',
            value: 100,
            count: 0,
        },
        {
            year: '04',
            value: 150,
            count: 150,
        },
        {
            year: '05',
            value: 100,
            count: 200,
        },
        {
            year: '06',
            value: 50,
            count: 150,
        },
        {
            year: '07',
            value: 100,
            count: 170,
        },
        {
            year: '08',
            value: 250,
            count: 50,
        },
        {
            year: '09',
            value: 100,
            count: 200,
        },
        {
            year: '10',
            value: 180,
            count: 130,
        },
        {
            year: '11',
            value: 190,
            count: 150,
        },
        {
            year: '12',
            value: 50,
            count: 150,
        },
    ];
    const config = {
        data: [data, data],
        xField: 'year',
        yField: ['value', 'count0'],
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
