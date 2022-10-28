export const handleChange = (e, cb, v) => {
    const { name, value } = e.target;

    cb({
        ...v,
        [name]: value
    })
}