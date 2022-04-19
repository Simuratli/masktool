import React from "react";
import { ToggleIcon } from "./icons";
import { DropdownHeaderPorpTypes } from '../Dropdown.types'
import { setToggleModal } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

function DropdownHeader({ setToggle, name, actions }: DropdownHeaderPorpTypes) {

    const dispatch = useDispatch();

    return (
        <div className="dropdown__header">
            <h1 onClick={() => { setToggle((prev: boolean) => !prev); }}>{name}</h1>
            <p onClick={() => { setToggle((prev: boolean) => !prev); }}>{actions}</p>
            <div className="dropdown__header__icon">
                <div onClick={() => { setToggle((prev: boolean) => !prev); }} className="dropdown__header__icon__border">
                    <ToggleIcon />
                </div>
                <div className="dropdown__header__icon__delete__container">
                    <svg onClick={() => { dispatch(setToggleModal(true)) }} className="dropdown__header__icon__delete" width="16.44" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.22222 0C9.76269 0 11.0216 1.20574 11.1065 2.72496L11.1111 2.88889H15.7778C16.146 2.88889 16.4444 3.18737 16.4444 3.55556C16.4444 3.89306 16.1936 4.17199 15.8682 4.21614L15.7778 4.22222H15.0702L13.9323 15.7948C13.8144 16.994 12.8431 17.92 11.6557 17.9951L11.4996 18H4.94483C3.73986 18 2.72325 17.124 2.53229 15.9497L2.51212 15.7948L1.37333 4.22222H0.666667C0.329159 4.22222 0.0502303 3.97142 0.00608593 3.64602L0 3.55556C0 3.21805 0.250803 2.93912 0.576204 2.89497L0.666667 2.88889H5.33333C5.33333 1.2934 6.62673 0 8.22222 0ZM13.7307 4.22222H2.71289L3.83905 15.6643C3.89127 16.1952 4.31141 16.6083 4.83186 16.661L4.94483 16.6667H11.4996C12.033 16.6667 12.4853 16.289 12.5887 15.7762L12.6054 15.6643L13.7307 4.22222ZM9.77778 6.66667C10.1153 6.66667 10.3942 6.91747 10.4384 7.24287L10.4444 7.33333V13.5556C10.4444 13.9237 10.146 14.2222 9.77778 14.2222C9.44027 14.2222 9.16134 13.9714 9.1172 13.646L9.11111 13.5556V7.33333C9.11111 6.96514 9.40959 6.66667 9.77778 6.66667ZM6.66667 6.66667C7.00417 6.66667 7.2831 6.91747 7.32725 7.24287L7.33333 7.33333V13.5556C7.33333 13.9237 7.03486 14.2222 6.66667 14.2222C6.32916 14.2222 6.05023 13.9714 6.00609 13.646L6 13.5556V7.33333C6 6.96514 6.29848 6.66667 6.66667 6.66667ZM8.22222 1.33333C7.40607 1.33333 6.73672 1.96188 6.67182 2.76131L6.66667 2.88889H9.77778C9.77778 2.02978 9.08133 1.33333 8.22222 1.33333Z" fill="#CE1E1E" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default React.memo(DropdownHeader);
