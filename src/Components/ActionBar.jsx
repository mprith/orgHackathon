import React from 'react';
import "../Container/HomePage.scss";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import {sortingFilter} from "../Constant";

export default function ActionBar(props) {
    const { setIsModalOpen, sortOn, handleSortSelect } = props;

    return (
        <div className='actionBar'>
            <Button variant="secondary" className="addBtn" onClick={() => { setIsModalOpen(true) }} size="lg">
                Add Challenge
            </Button>

            <DropdownButton
                title={sortOn ? sortOn : "Select Filter"}
                onSelect={handleSortSelect}
                variant="secondary">
                {sortingFilter.map(
                    (variant) => (
                        <Dropdown.Item key={variant} eventKey={variant}>{variant}</Dropdown.Item>))}
            </DropdownButton>
        </div>

    )
}