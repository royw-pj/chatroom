import React from 'react';
import styled from '@emotion/styled'

const GlobalContainer = styled.div`
    background-color: #f7f7f7;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
`;

export default (props) => {
    return (
        <GlobalContainer>
            {props.children}
        </GlobalContainer>
    )
};
