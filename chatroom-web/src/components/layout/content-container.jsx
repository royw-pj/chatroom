import React from 'react';
import styled from '@emotion/styled'

const ContentContainer = styled.div`
    margin-top: 0.5rem;
    overflow: auto;
    height: calc(100vh - 4.5rem);
`;

export default (props) => {
    return (
        <ContentContainer  maxWidth="xl">
            {props.children}
        </ContentContainer>
    )
};

