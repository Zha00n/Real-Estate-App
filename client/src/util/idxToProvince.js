export const arrProvince = [
    'central province',
    'eastern province',
    'north central province',
    'northern province',
    'sabaragamuwa province',
    'southern province',
    'uva province',
    'western province'
]

export const provinceToIdx = (province) => {
    return arrProvince.findIndex((cont) => cont.toLowerCase() === province.toLowerCase())
}

export const idxToProvince = (idx) => {
    return (arrProvince.filter((_, index) => index === Number(idx)))[0]
}



