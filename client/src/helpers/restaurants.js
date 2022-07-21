import { v4 as uuid } from 'uuid';

export const restaurants = [
    {
        id: uuid(),
        name: 'The French Gourmet',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        location: 'New York City, New York',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora sequi asperiores explicabo temporibus dolore quam totam ut dolorum reiciendis nostrum'
    },
    {
        id: uuid(),
        name: 'Polo Bar',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        location: 'Los Angeles, California',
        description: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores iure blanditiis consequuntur deserunt. Quaerat eaque dignissimos itaque repellat eligendi voluptatem'
    },
    {
        id: uuid(),
        name: 'Tuscany Courtyard',
        image: 'https://images.unsplash.com/photo-1586999768265-24af89630739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        location: 'Washington D.C, Washington',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo maiores rem molestias illum! Commodi consectetur magnam et. Magnam, nulla quidem'
    }
]