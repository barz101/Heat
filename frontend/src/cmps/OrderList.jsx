import React from 'react'
import { OrderPreview } from './OrderPreview.jsx';

import { Header, Image, Table } from 'semantic-ui-react'


export default function OrderList(props) {
    return (
        <Table basic='very' celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Buyer</Table.HeaderCell>
                    <Table.HeaderCell>Seller</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                    <Table.HeaderCell>Participants</Table.HeaderCell>
                    <Table.HeaderCell>Total Price</Table.HeaderCell>
                    <Table.HeaderCell>Ordered At</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {props.orders && props.orders.map((order, idx) => <OrderPreview order={order} key={idx}/> )}
            </Table.Body>
        </Table>
    )
}