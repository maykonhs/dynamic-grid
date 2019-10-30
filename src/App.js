import React from 'react';
import DynamicGrid from './DynamicGrid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


var items = require('./json/model.json');
var items2 = require('./json/model2.json');
var items3 = require('./json/model3.json');
var items4 = require('./json/model4.json');
var items5 = require('./json/model5.json');
var items6 = require('./json/model6.json');
var items7 = require('./json/model7.json');
var items8 = require('./json/model8.json');
var items9 = require('./json/model9.json');
var items10 = require('./json/model10.json');
var Duplicate1 = require('./json/modelDuplicate.json');

class SimpleTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Panel: items,
            Panel2: items2,
            Panel3: items3,
            Panel4: items4,
            Panel5: items5,
            Panel6: items6,
            Panel7: items7,
            Panel8: items8,
            Panel9: items9,
            Panel10: items10,
            Duplicate1: Duplicate1,
            return: null,
            func: {
                'changeColum': this.changeColum,
                'clickTest': this.clickTest,
                'AddSelectedItem': this.AddSelectedItem,
                'ShowObject': this.ShowObject,
                'setEdit': this.setEdit,
                'checkboxFunction': this.checkboxFunction.bind(this),
            }
        };
    }

    clickTest(name, item, changeState, changeEdit) {
        changeState('Coluna5', 'Novo Valor');
    }

    async checkboxFunction(id, selected) {
        if (selected.indexOf(id) >= 0) {
            console.log('Removendo...');
            console.log(this.state.Panel2.Grid.Rows[id]);
            return true;
        } else {
            console.log('Adicionando...');
            console.log(this.state.Panel2.Grid.Rows[id]);
            return true;
        }
    }

    changeColum(name, item, changeState, changeEdit) {
        changeState('Coluna4', item[name]);
    }

    ShowObject(grid) {
        var gridJson = JSON.stringify(this.state.Panel7, null, 2);
        this.setState({ gridJson: gridJson });
    }

    setEdit(name, item, changeState, changeEdit) {

        changeEdit(item, 'Coluna1');
    }

    AddSelectedItem(itensSelected) {

        itensSelected.map(item => {
            //var itemAdd = {
            //    "001": "nulla",
            //    "002": "3938.43",
            //    "003": "2015-03-10",
            //    "004": 1,
            //    "005": "do",
            //    "006": "in officia ad do tempor"
            //};
            this.state.Duplicate1.Grid.Rows.push(item);
        });

        this.setState(Duplicate1);
    }

    deletedItem(item) {
        console.log(item);
        // return true;
    }



    render() {
        return (
            <div className="divTable">
                <Typography variant="h5" component="h2">
                    Exemplo de Grid
                </Typography><br />
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography> 1 - Exibição da grid padrão</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DynamicGrid grid={this.state.Panel} func={this.state.func} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography> 2 - Exibição da grid composta</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={12}>
                                <DynamicGrid grid={this.state.Panel2} func={this.state.func} funcDuplicate={this.AddSelectedItem.bind(this)} />
                            </Grid>
                            <Grid item xs={12}>
                                <DynamicGrid grid={this.state.Duplicate1} />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>3 - Exibição da grid com paginação</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DynamicGrid grid={this.state.Panel3} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>4 - Exibição da grid com ordenação</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DynamicGrid grid={this.state.Panel4} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography> 5 - Exibição da grid com Edição</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <DynamicGrid grid={this.state.Panel5} func={this.state.func} />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>6 - Exibição da grid com Eventos de Onclick e Onchange</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <DynamicGrid grid={this.state.Panel6} func={this.state.func} />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>7 - Exibição da grid exibindo o retorno</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DynamicGrid grid={this.state.Panel7} func={this.state.func} />
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={event => this.ShowObject(this.state.Panel9)}>
                                    Ver Dados
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography> Resultado </Typography>
                                        <Typography>{this.state.gridJson}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>8 - Exibição da grid com edição selecionavel</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <DynamicGrid disabledCheckbox grid={this.state.Panel8} func={this.state.func} />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>9 - Exibição da grid com colunas ocultas</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <DynamicGrid grid={this.state.Panel9} />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography> 10 - Exibição da grid com exclusão </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DynamicGrid grid={this.state.Panel10} funcDeleted={this.deletedItem.bind(this)} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default SimpleTable;