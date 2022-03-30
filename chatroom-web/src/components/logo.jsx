import React from 'react';
import styled from '@emotion/styled'

const Logo = styled.img`
    object-fit: contain;
`
export default ()=> <Logo src='/logo.png'/>;
export const SmallLogo = () => <Logo src='/logo-small.png'/>;