import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import NumberFormat from 'react-number-format';

const CssSelect = withStyles({
    root: {
        margin: 0,
        padding: 0,
        font: "unset",
        fontSize: 10,
        lineHeight: 1.2
    }
})(Select);

const CssMenuItem = withStyles({
    root: {
        padding: "2px",
        font: "unset",
        fontSize: 10,
        lineHeight: 1.2
    }
})(MenuItem);

const CssTextField = withStyles({
    root: {
        margin: 0,
        padding: 0,
        font: "unset",
        fontSize: 10
    }
})(TextField);

const CustomButton = withStyles({
    root: {
        fontSize: 9,
        padding: '3px'
    }
})(Button);

const CustomCell = withStyles({
    root: {
        fontSize: 10,
        padding: 2,
    }
})(TableCell);

class DynamicCell extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = (key, item) => event => {
        if (item.nat_onclick !== null && item.nat_onclick !== "") {
            this.props.func[item.nat_onclick](key, this.props.item, this.changeProperty, this.setEditable);
        }
    }

    handleIntChange = (key, item) => event => {
        this.props.item[item.nat_autonumber] = event.target.value.replace(/\D/g, '');
        this.setState(this.props.item);

        if (item.nat_onchange !== null && item.nat_onchange !== "" && item.nat_onchange.indexOf("onBlur[") === -1) {
            this.props.func[item.nat_onchange](key, this.props.item, this.changeProperty, this.setEditable);
        }
    };

    handleChange = (key, item) => (event, args) => {
        this.props.item[item.nat_autonumber] = event.target.value;
        this.setState(this.props.item);

        if (item.nat_onchange !== null && item.nat_onchange !== "" && item.nat_onchange.indexOf("onBlur[") === -1) {
            this.props.func[item.nat_onchange](key, this.props.item, this.changeProperty, this.setEditable, args.props);
        }
    };

    handleBlur = (key, item) => {
        if (item.nat_onblur != null && item.nat_onblur !== "") {
            this.props.func[item.nat_onblur](key, this.props.item, this.changeProperty, this.setEditable);
        }
        if (item.nat_onchange != null && item.nat_onchange !== "" && item.nat_onchange.indexOf("onBlur[") !== -1) {
            let onBlurEvent = item.nat_onchange.replace("onBlur[", "").replace("]", "");
            this.props.func[onBlurEvent](key, this.props.item, this.changeProperty, this.setEditable);
        }
    };

    handleFocus = (key, item) => {
        if (item.nat_onfocus != null && item.nat_onfocus !== "") {
            this.props.func[item.nat_onfocus](key, this.props.item, this.changeProperty, this.setEditable);
        }
    };

    changeProperty = (key, value) => {
        this.props.item[key] = value;
        this.setState(this.props.item);
    }

    setEditable = (item, key) => {
        if (item.edit) {
            if (item.edit.indexOf(key) >= 0) {
                var itens = item.edit.filter(item => item !== key);
                item.edit = itens;
            } else {
                item.edit.push(key);
            }
        } else {
            item.edit = [key];
        }
        this.setState(this.props.item);
    }

    render() {

        return this.props.columns.map((item, index) => {
            item.nat_type ? item.nat_type = item.nat_type.toLowerCase() : item.nat_type = 'text';
            if (!item.hasOwnProperty("nat_exibition") || item.nat_exibition !== false) {
                // TODO: Deve haver um jeito mais simples de fazer isso
                let isActive = item.nat_readonly === false;

                if (Array.isArray(this.props.item.edit) && (this.props.item.edit && this.props.item.edit.indexOf(item.nat_autonumber) >= 0)) {
                    if (item.nat_readonly === false) {
                        isActive = false;
                    } else {
                        isActive = true;
                    }

                }

                if (isActive) {
                // if (item.nat_readonly === false || (this.props.item.edit && this.props.item.edit.indexOf(item.nat_autonumber) >= 0)) {
                    switch (item.nat_type) {
                        case 'int':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'onClickClass' : null}>
                                    <CssTextField type="text"
                                        key={item.nat_autonumber + index}
                                        value={this.props.item[item.nat_autonumber]}
                                        onChange={this.handleIntChange(item.nat_autonumber, item)}
                                        onBlur={() => this.handleBlur(item.nat_autonumber, item)}
                                        onFocus={() => this.handleFocus(item.nat_autonumber, item)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        fullWidth
                                        InputProps={{ style: { fontSize: 10, width: item.nat_width } }}
                                        inputProps={{ maxLength: item.prop.nat_maxnumber > 0 ? item.prop.nat_maxnumber : null }}
                                        required
                                    />
                                </CustomCell>
                            );
                        case 'decimal':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'onClickClass' : null}>
                                    <CssTextField
                                        key={item.nat_autonumber + index}
                                        value={this.props.item[item.nat_autonumber]}
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        fullWidth
                                        InputProps={{ style: { fontSize: 10, width: item.nat_width } }}
                                        min={item.prop.minNumber}
                                        max={item.prop.maxNumber}
                                        margin="normal"
                                        onChange={this.handleChange(item.nat_autonumber, item)}
                                        onBlur={() => this.handleBlur(item.nat_autonumber, item)}
                                        onFocus={() => this.handleFocus(item.nat_autonumber, item)}
                                        required
                                    />
                                </CustomCell>
                            );
                        case 'float':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'onClickClass' : null}>
                                    <CssTextField
                                        key={item.nat_autonumber + index}
                                        value={this.props.item[item.nat_autonumber]}
                                        onChange={this.handleChange(item.nat_autonumber, item)}
                                        onBlur={() => this.handleBlur(item.nat_autonumber, item)}
                                        onFocus={() => this.handleFocus(item.nat_autonumber, item)}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom
                                        }}
                                        fullWidth
                                        InputProps={{ style: { fontSize: 10, width: item.nat_width } }}
                                        required
                                    />
                                </CustomCell>
                            );
                        case 'date':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'onClickClass' : null}>
                                    <CssTextField
                                        key={item.nat_autonumber + index}
                                        type="date"
                                        onChange={this.handleChange(item.nat_autonumber, item)}
                                        onBlur={() => this.handleBlur(item.nat_autonumber, item)}
                                        onFocus={() => this.handleFocus(item.nat_autonumber, item)}
                                        value={this.props.item[item.nat_autonumber]}
                                        fullWidth
                                        InputProps={{ style: { fontSize: 10, width: item.nat_width } }}
                                        required
                                    />
                                </CustomCell>
                            );
                        case 'button':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    <CustomButton size="small" variant="contained" color="primary" key={item.nat_autonumber + index}>
                                        {this.props.item[item.nat_autonumber]}
                                    </CustomButton>
                                </CustomCell>
                            );
                        case 'link':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    <CustomButton href={this.props.item[item.nat_autonumber]} size="small" target="blank" key={item.nat_autonumber + index}>
                                        Link
                                    </CustomButton>
                                </CustomCell>
                            );
                        case 'select':
                            if (!Array.isArray(item.prop.options)) {
                                throw new Error(`Campo ${item.nat_name} está sem options`);
                            }
                            return (
                                <CustomCell key={item.nat_autonumber + index} align="left" onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'onClickClass' : null}>
                                    <CssSelect
                                        key={item.nat_autonumber + index}
                                        value={this.props.item[item.nat_autonumber]}
                                        required
                                        onChange={this.handleChange(item.nat_autonumber, item)}
                                        onBlur={() => this.handleBlur(item.nat_autonumber, item)}
                                        onFocus={() => this.handleFocus(item.nat_autonumber, item)}
                                        fullWidth
                                        SelectDisplayProps={{ style: { width: item.nat_width } }}
                                    >
                                        {item.prop.options.map(option => (
                                            <CssMenuItem key={option.value} value={option.value} description={option.description}>
                                                {option.description}
                                            </CssMenuItem>
                                        ))}
                                    </CssSelect>
                                </CustomCell>
                            );
                        case 'Bool':
                            let checkBoolean = this.props.item[item.nat_autonumber] === true ? 'Sim' : 'Não';
                            return (
                                <CustomCell key={item.nat_autonumber + index} className="readonly" onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    {checkBoolean}
                                </CustomCell>
                            );
                        default:
                            return (
                                <CustomCell key={item.nat_autonumber + index} align="left" onClick={this.handleClick(item.nat_autonumber, item, index)} className={item.nat_onclick ? 'onClickClass' : null}>
                                    <CssTextField
                                        key={item.nat_autonumber + index}
                                        value={this.props.item[item.nat_autonumber]}
                                        onChange={this.handleChange(item.nat_autonumber, item)}
                                        onBlur={() => this.handleBlur(item.nat_autonumber, item)}
                                        onFocus={() => this.handleFocus(item.nat_autonumber, item)}
                                        fullWidth
                                        InputProps={{ style: { fontSize: 10, width: item.nat_width } }}
                                        inputProps={{ maxLength: item.prop.nat_maxnumber > 0 ? item.prop.nat_maxnumber : null }}
                                        margin="normal"
                                        required
                                        className={'without-padding'}
                                    />
                                </CustomCell>
                            );
                    }
                }
                else {
                    switch (item.nat_type) {
                        case 'int':
                        case 'decimal':
                            return (
                                <CustomCell key={item.nat_autonumber + index} className="readonly" onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    {this.props.item[item.nat_autonumber]}
                                </CustomCell>
                            );
                        case 'float':
                            let valor = '';
                            if ((this.props.item[item.nat_autonumber] != null) || (this.props.item[item.nat_autonumber] != undefined)) {
                                valor = `${this.props.item[item.nat_autonumber]}`;
                                if (valor.indexOf('.') > -1) {
                                    valor = `${this.props.item[item.nat_autonumber]}0`;
                                }
                                valor = parseFloat(valor).toFixed(2)
                                valor = valor.toString().replace('.', ',');
                            }
                            return (
                                <CustomCell key={item.nat_autonumber + index} className="readonly" onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    <NumberFormat value={valor} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$'} />
                                </CustomCell>
                            );
                        case 'datetime':
                            let unformattedDate = ((this.props.item[item.nat_autonumber] == '') || (this.props.item[item.nat_autonumber] == null)) ? '' : this.props.item[item.nat_autonumber].substr(0, 10).replace(/-/g, '/');
                            return (
                                <CustomCell key={item.nat_autonumber + index} className="readonly" onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    {
                                        unformattedDate
                                    }
                                </CustomCell>
                            );
                        case 'date':
                            // var date = new Date(this.props.item[item.nat_autonumber]).toLocaleDateString('pt-BR');
                            return (
                                <CustomCell key={item.nat_autonumber + index} className="readonly" onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    {
                                        ((this.props.item[item.nat_autonumber] == '') || (this.props.item[item.nat_autonumber] == null)) ? '' : new Date(this.props.item[item.nat_autonumber]).toLocaleDateString('pt-BR')
                                    }
                                </CustomCell>
                            );
                        case 'button':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className="readonly" className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    <CustomButton size="small" variant="contained" color="primary" key={item.nat_autonumber + index}>
                                        {this.props.item[item.nat_autonumber]}
                                    </CustomButton>
                                </CustomCell>
                            );
                        case 'link':
                            return (
                                <CustomCell key={item.nat_autonumber + index} onClick={this.handleClick(item.nat_autonumber, item)} className="readonly" className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    <CustomButton href={this.props.item[item.nat_autonumber]} size="small" target="blank">
                                        Link
								</CustomButton>
                                </CustomCell>
                            );
                        case 'select':
                            if (!Array.isArray(item.prop.options)) {
                                throw new Error(`Campo ${item.nat_name} está sem options`);
                            }
                            return (
                                <CustomCell key={item.nat_autonumber + index} align="left" className={null}>
                                    <CssSelect
                                        key={item.nat_autonumber + index}
                                        value={this.props.item[item.nat_autonumber]}
                                        disabled
                                        fullWidth
                                        SelectDisplayProps={{ style: { width: item.nat_width } }}
                                    >
                                        {item.prop.options.map(option => (
                                            <CssMenuItem key={option.value} value={option.value} description={option.description}>
                                                {option.description}
                                            </CssMenuItem>
                                        ))}
                                    </CssSelect>
                                </CustomCell>
                            );
                        case 'Bool':
                            let checkBoolean = this.props.item[item.nat_autonumber] === true ? 'Sim' : 'Não';
                            return (
                                <CustomCell key={item.nat_autonumber + index} className="readonly" onClick={this.handleClick(item.nat_autonumber, item)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    {checkBoolean}
                                </CustomCell>
                            );
                        default:
                            return (
                                <CustomCell key={item.nat_autonumber + index} align="left" onClick={this.handleClick(item.nat_autonumber, item, index)} className={item.nat_onclick ? 'readonly onClickClass' : 'readonly'}>
                                    {this.props.item[item.nat_autonumber]}
                                </CustomCell>
                            );
                    }
                }
            }
        });
    }
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            decimalSeparator={'.'}
            prefix="R$"
        />
    );
}


export default DynamicCell;