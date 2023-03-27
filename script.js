const table = document.querySelector('#myTable');
const rows = Array.from(table.querySelectorAll('tbody tr'));
const data = rows.map(row => {
  const cells = row.querySelectorAll('td');
  return {
    codigo: cells[0].textContent.trim(),
    descricao: cells[1].textContent.trim(),
    aplicacao: cells[2].textContent.trim(),
    preco: cells[3].textContent.trim()
  };
});

const input = document.querySelector('#search-input');
const button = document.querySelector('#search-btn');
const tbody = table.querySelector('tbody');

button.addEventListener('click', () => {
  const term = input.value.trim().toLowerCase();
  const filteredData = data.filter(item => {
    return item.codigo.toLowerCase().includes(term) ||
           item.descricao.toLowerCase().includes(term) ||
           item.aplicacao.toLowerCase().includes(term);
  });
  render(filteredData);
});

function render(data) {
  const html = data.map(item => {
    return `
      <tr>
        <td>${item.codigo}</td>
        <td>${item.descricao}</td>
        <td>${item.aplicacao}</td>
        <td>${item.preco}</td>
      </tr>
    `;
  }).join('');
  tbody.innerHTML = html;
}

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Overlay = React.createClass({
	render: function() {
		return (
			<div className="Overlay" style={{'backgroundImage':'url(' + this.props.image + ')'}}>
				Something
			</div>
		);
	}
});

var Container = React.createClass({
	render: function() {
		return (
			<div className="Container">
				{this.props.children}
			</div>
		)
	}
});

var WorkspaceInformation = React.createClass({
	render: function() {
		
		if(this.props.duration > 1) {
			var duration = this.props.duration + ' days';
		} else {
			var duration = this.props.duration + ' day';
		}
		
		return (
			<div className="WorkspaceInformation">
				<div className="WorkspaceName">{this.props.name}</div>
				<div className="WorkspacePrice">
					<div className="Price">{this.props.price} GBP</div>
					<div className="Duration">/ {duration}</div>
				</div>
			</div>
		);
	}
});

var WorkspaceMeta = React.createClass({
	render: function() {
		
		if(this.props.people > 1) {
			var people = this.props.people + ' people';
		} else {
			var people = this.props.people + ' person';
		}
		
		
		return (
			<div className="WorkspaceMeta">
				<div className="Description">Entire office for <strong>{people}</strong></div>	
				<div className="Dates"><strong>Mon, Aug 22, 2016</strong> to <strong>Fri, Aug 29, 2016</strong></div>
			</div>
		);
	}
});

var ImagePreview = React.createClass({
	render: function() {
		return (
			<div className="ImagePreview" style={{'backgroundImage': 'url('+ this.props.image +')'}}>
				<div className="WorkspaceOverview">
					<WorkspaceInformation name="Coworking Space, South Korea" price={this.props.price} duration="1" />
					<WorkspaceMeta people={this.props.people} />
				</div>
			</div>
		);
	}
});

var OrderSummary = React.createClass({
	render: function() {
		
		// Duration pluralisation
		if(this.props.duration > 1) {
			var duration = this.props.duration + ' days';
		} else {
			var duration = this.props.duration + ' day';
		}
		
		// Initial total Calculation
		var initialTotal = this.props.duration * this.props.price;
		
		// Discount Calculation
		var discount = Math.floor((initialTotal / 100) * this.props.discount);
		
		// Subtotal (with Discount)
		var subTotal = initialTotal - discount;
		
		// Calculate tax
		var tax = Math.floor((subTotal / 100) * this.props.tax);
		
		// Total
		var total = subTotal + tax;
		
		return (
			<div className="OrderSummary">
				<div className="Title">Order Summary</div>
				<table>
					<tr>
						<td>{this.props.price} x {duration}</td>
						<td>{initialTotal} GBP</td>
					</tr>
					<tr>
						<td>Discount</td>
						<td>{discount} GBP</td>
					</tr>
					<tr>
						<td>Subtotal</td>
						<td>{subTotal} GBP</td>
					</tr>
					<tr>
						<td>Tax</td>
						<td>{tax} GBP</td>
					</tr>
				</table>
				<div className="Total">
					<div className="TotalLabel">Total</div>
					<div className="Amount">
						{total} <small>GBP</small>
					</div>
				</div>
			</div>
		);
	}
});

var PaymentForm = React.createClass({
	render: function() {
		return (
			<div className="PaymentForm">
				<form onSubmit={this.props.onSubmit}>
					<div className="Title">Payment information</div>
					<BasicInput name="name" label="Name on credit card" type="text" placeholder="John Smith" />
					<BasicInput name="card" label="Credit card number" type="number" placeholder="0000 0000 0000 0000" />
					<ExpiryDate />
					<CheckoutButton />
				</form>
			</div>
		);
	}
});

var CheckoutButton = React.createClass({
	render: function() {
		return (
			<div className="CheckoutButton">
				<button>Book securely</button>
				<span><i className="fa fa-fw fa-lock"></i> Your credit card information is encrypted</span>
			</div>
		);
	}
});

var ExpiryDate = React.createClass({
	render: function() {
		return (
			<div className="ExpiryDate">
				<div>
					<label>Expires on</label>
					<div className="Expiry">
						<select>
							<option value="">January</option>
							<option value="">February</option>
							<option value="">March</option>
							<option value="">April</option>
							<option value="">May</option>
							<option value="">June</option>
							<option value="">July</option>
							<option value="">August</option>
							<option value="">September</option>
							<option value="">October</option>
							<option value="">November</option>
							<option value="">December</option>
						</select>
						<select name="" id="">
							<option value="">2016</option>
							<option value="">2017</option>
							<option value="">2018</option>
							<option value="">2019</option>
							<option value="">2020</option>
							<option value="">2021</option>
						</select>
					</div>
				</div>
				<div className="CVCField">
					<label>CVC</label>
					<input placeholder="000" type="number" />
				</div>
			</div>
		);
	}
});

var BasicInput = React.createClass({
	render: function() {
		return (
			<div className="BasicInput">
				<label for={this.props.name}>{this.props.label}</label>
				<input id={this.props.name} type={this.props.type} placeholder={this.props.placeholder} />
			</div>
		);
	}
});

var Checkout = React.createClass({
	render: function() {
		return (
			<div className="Checkout">
				<OrderSummary discount={this.props.discount} tax={this.props.tax} price={this.props.price} duration={this.props.duration} />
				<PaymentForm onSubmit={this.props.onSubmit} />
			</div>
		);
	}
});

var Header = React.createClass({
	
	render: function() {
		return (
			<header>
				<input onChange={this.props.onChange} type="range" max="100" min="1" step="1" />
			</header>
		);
	}
});

var App = React.createClass({
	
	getInitialState: function() {
		return ({
			mounted: false,
			people: 1,
			price: 320.00,
			tax: 20,
			duration: 5,
			discount: 5
		});
	},
	
	componentDidMount: function() {
		this.setState({ mounted: true });
	},
	
	handleSubmit: function(e) {
		e.preventDefault();
	},
	
	handleChange: function(e) {
		console.log(e.target.value);
		this.setState({ duration: e.target.value });
	},

	render: function() {
		
		var overlay, container;
		if(this.state.mounted) {
			overlay = (
				<Overlay image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg" />
			);
			container = (
				<Container>
					<ImagePreview price={this.state.price} duration={this.state.duration} people={this.state.people} image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg" />
					<Checkout discount={this.state.discount} tax={this.state.tax} price={this.state.price} duration={this.state.duration} onSubmit={this.handleSubmit} />
				</Container>
			);
		}
		
		return(
			<div className="App">
				<ReactCSSTransitionGroup transitionName="overlay" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					{overlay}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="container" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					{container}
				</ReactCSSTransitionGroup>
				<Header onChange={this.handleChange} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);

