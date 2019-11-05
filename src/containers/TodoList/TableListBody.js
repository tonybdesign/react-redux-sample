import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
    Checkbox,
    FormControlLabel,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core';
import {
    Edit,
    Favorite,
    Delete,
    FavoriteBorder
} from '@material-ui/icons';


const TableListBody = ({ items, onItemFieldChange, onDeleteItem }) => <TableBody>
    {items.map(todo => (
        <TableRow key={todo.id}>
            <TableCell>{todo.id}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.shortDescription}</TableCell>
            <TableCell>
                <FormControlLabel
                    control={<Checkbox
                        checked={todo.done}
                        onChange={onItemFieldChange(todo.id, 'done')}
                        color="primary"
                    />}
                />
            </TableCell>
            <TableCell>
                <FormControlLabel
                    control={<Checkbox
                        checked={todo.favorite}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        onChange={onItemFieldChange(todo.id, 'favorite')} />
                    }
                />
            </TableCell>
            <TableCell>
                <Link to={`/edit/${todo.id}`}><Edit /></Link>
                <Delete onClick={onDeleteItem(todo.id)} />
            </TableCell>
        </TableRow>
    ))}
</TableBody>;

TableListBody.defaultProps = {
    items: [],
};

TableListBody.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        shortDescription: PropTypes.string,
        done: PropTypes.bool,
        favorite: PropTypes.bool,
    })),
    onDeleteItem: PropTypes.func,
    onItemFieldChange: PropTypes.func,
};

export default TableListBody;