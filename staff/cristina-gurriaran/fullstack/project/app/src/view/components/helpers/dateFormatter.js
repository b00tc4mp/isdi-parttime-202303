import React from 'react';

export const dateFormater = (date) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString(undefined, options);
}