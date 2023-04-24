import React, { useEffect, useState } from 'react';
import { Tabs, Upload, Layout, Modal, Row, Col, Button, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import { Column, Pie, Line } from '@ant-design/plots';
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
    {
        "name": "欠款",
        "month": "Jan.",
        "money": 200
    },
    {
        "name": "收款",
        "month": "Jan.",
        "money": 50
    },
    {
        "name": "欠款",
        "month": "Feb.",
        "money": 250
    },
    {
        "name": "收款",
        "month": "Feb.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "Mar.",
        "money": 100
    },
    {
        "name": "收款",
        "month": "Mar.",
        "money": 0
    },
    {
        "name": "欠款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "收款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "May.",
        "money": 100
    },
    {
        "name": "收款",
        "month": "May.",
        "money": 200
    },
    {
        "name": "欠款",
        "month": "Jun.",
        "money": 50
    },
    {
        "name": "收款",
        "month": "Jun.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "Jul.",
        "money": 100
    },
    {
        "name": "收款",
        "month": "Jul.",
        "money": 170
    },
    {
        "name": "欠款",
        "month": "Aug.",
        "money": 250
    },
    {
        "name": "收款",
        "month": "Aug.",
        "money": 50
    },
    {
        "name": "欠款",
        "month": "Sep.",
        "money": 100
    },
    {
        "name": "收款",
        "month": "Sep.",
        "money": 200
    },
    {
        "name": "欠款",
        "month": "Oct.",
        "money": 180
    },
    {
        "name": "收款",
        "month": "Oct.",
        "money": 130
    },
    {
        "name": "欠款",
        "month": "Nov.",
        "money": 190
    },
    {
        "name": "收款",
        "month": "Nov.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "Dec.",
        "money": 50
    },

    {
        "name": "收款",
        "month": "Dec.",
        "money": 150
    },

];
const data1 = [
    {
        "name": "欠款",
        "month": "Jan.",
        "money": 200
    },
    {
        "name": "欠款",
        "month": "Feb.",
        "money": 250
    },
    {
        "name": "欠款",
        "month": "Mar.",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "欠款",
        "month": "May",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Jun.",
        "money": 50
    },
    {
        "name": "欠款",
        "month": "Jul.",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Aug.",
        "money": 250
    },
    {
        "name": "欠款",
        "month": "Sep.",
        "money": 100
    },
    {
        "name": "欠款",
        "month": "Oct.",
        "money": 180
    },
    {
        "name": "欠款",
        "month": "Nov.",
        "money": 190
    },
    {
        "name": "欠款",
        "month": "Dec.",
        "money": 50
    },
];
const data2 = [
    {
        "name": "收款",
        "month": "Jan.",
        "money": 50
    },
    {
        "name": "收款",
        "month": "Feb.",
        "money": 150
    },
    {
        "name": "收款",
        "month": "Mar.",
        "money": 0
    },
    {
        "name": "收款",
        "month": "Apr.",
        "money": 150
    },
    {
        "name": "收款",
        "month": "May.",
        "money": 200
    },
    {
        "name": "收款",
        "month": "Jun.",
        "money": 150
    },
    {
        "name": "收款",
        "month": "Jul.",
        "money": 170
    },
    {
        "name": "收款",
        "month": "Aug.",
        "money": 50
    },
    {
        "name": "收款",
        "month": "Sep.",
        "money": 200
    },
    {
        "name": "收款",
        "month": "Oct.",
        "money": 130
    },
    {
        "name": "收款",
        "month": "Nov.",
        "money": 150
    },
    {
        "name": "收款",
        "month": "Dec.",
        "money": 150
    },

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
                                                            <DemoColumn data={data} />
                                                        </Col>
                                                        <Col span={24}>
                                                            <DemoLine data={data} />
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
                                                            <DemoColumn data={data1} />
                                                        </Col>
                                                        <Col span={24}>
                                                            <DemoLine data={data1} />
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
                                                            <DemoColumn data={data2} />
                                                        </Col>
                                                        <Col span={24}>
                                                            <DemoLine data={data2} />
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
const DemoColumn = (props) => {
    let data = props.data;
    const config = {
        data,
        isGroup: true,
        xField: 'month',
        yField: 'money',
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


const DemoPie = (props) => {
    const data = [
        {
            type: '一月',
            value: 20,
        },
        {
            type: '二月',
            value: 30,
        },
        {
            type: '三月',
            value: 200,
        },
        {
            type: '四月',
            value: 500,
        },
        {
            type: '五月',
            value: 230,
        },
        {
            type: '六月',
            value: 120,
        },
        {
            type: '七月',
            value: 210,
        }, {
            type: '八月',
            value: 50,
        }, {
            type: '九月',
            value: 230,
        }, {
            type: '十月',
            value: 110,
        }, {
            type: '十一月',
            value: 100,
        }, {
            type: '十二月',
            value: 30,
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
const DemoLine = (props) => {
    let data = props.data;
    const config = {
        data,
        xField: 'month',
        yField: 'money',
        seriesField: 'name',
        legend: {
            position: 'top',
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };

    return <Line {...config} />;
};