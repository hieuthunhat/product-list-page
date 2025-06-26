import {readData, writeData} from './productServices.js';

// Create
const addOne = async (data) => {
    const productsData = await readData();
    const one = {id: productsData.length + 1, ...data, createdAt: new Date()};
    const newList = [one, ...productsData];
    await writeData(newList);
    return one;
}

// Read
const getMany = async ({limit, sort}) => {
    const productsData = await readData();
    
    // Handle different sort options
    if (sort) {
        if (sort === 'asc' || sort === 'date_asc') {
            productsData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sort === 'desc' || sort === 'date_desc') {
            productsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === 'price_asc') {
            productsData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sort === 'price_desc') {
            productsData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sort === 'name_asc') {
            productsData.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        } else if (sort === 'name_desc') {
            productsData.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        }
    }

    if (limit) {
        return productsData.slice(0, limit);
    }
    return productsData;
}

const getOne = async (id) => {
    const productsData = await readData();
    const one = productsData.find(product => product.id === id);
    if (one) {
        return one;
    } else {
        return null;
    }
}


// Update
const updateOne = async (id, data) => {
    const productsData = await readData();
    const updateOneIndex = productsData.findIndex(product => product.id === id);
    if (updateOneIndex !== -1) {
        productsData[updateOneIndex] = {...productsData[updateOneIndex], ...data};
        await writeData(productsData);
        return productsData[updateOneIndex];
    } else {
        return null;
    }
}

// Delete 
const deleteOne = async (id) => {
    const productsData = await readData();
    const deleteOneId = productsData.findIndex(product => product.id === id);
    if (deleteOneId !== -1) {
        const deleteData = productsData.splice(deleteOneId, 1);
        await writeData(productsData);
        return deleteData[0];
    } else {
        return null;
    }
}

export {deleteOne, updateOne, addOne, getMany, getOne};