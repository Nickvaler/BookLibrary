class Book extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.book };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        
        return <tr>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.author}</td>
                <td>{this.state.data.publicationYear}</td>
                <td><button className="btn btn-danger" onClick={this.onClick}>Удалить</button></td>
        </tr>;
    }
}

class BookForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", author: "", publicationYear: 0 };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAuthorNameChange = this.onAuthorNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onAuthorNameChange(e) {
        this.setState({ author: e.target.value });
    }
    onPriceChange(e) {
        this.setState({ publicationYear: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var bookName = this.state.name.trim();
        var authorName = this.state.author.trim();
        var pubYear = this.state.publicationYear;
        
        this.props.onBookSubmit({ name: bookName, author: authorName, publicationYear: pubYear});
        this.setState({  name: "", author: "", publicationYear: 0 });
    }
    render() {
        return (
                <form onSubmit={this.onSubmit}>
                     <div className="form-group">
                        <label for="bookName">Название книги</label>
                        <input className="form-control" id="bookName" type="text"
                            placeholder="Название книги"
                            value={this.state.name}
                            onChange={this.onNameChange} />
                    </div>
                    <div className="form-group">
                        <label for="author">Автор</label>
                        <input className="form-control" id="author" type="text"
                            placeholder="Автор"
                            value={this.state.author}
                            onChange={this.onAuthorNameChange} />
                    </div>
                    <div className="form-group">
                        <label for="publicationYear">Год издания</label>
                        <input className="form-control" id="publicationYear" type="number"
                            placeholder="Год издания"
                            value={this.state.publicationYear}
                            onChange={this.onPriceChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </form>
            
        );
    }
}

class BooksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { books: [] };

        this.onAddBook = this.onAddBook.bind(this);
        this.onRemoveBook = this.onRemoveBook.bind(this);
    }
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ books: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    // добавление объекта
    onAddBook(book) {
        if (book) {

            const data = new FormData();
            data.append("name", book.name);
            data.append("author", book.author);
            data.append("publicationYear", book.publicationYear);
            var xhr = new XMLHttpRequest();

            xhr.open("put", this.props.apiUrl, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    // удаление объекта
    onRemoveBook(book) {

        if (book) {
            var url = this.props.apiUrl + "/" + book.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {

        var remove = this.onRemoveBook;
        return <div className="wrapper">
            <div className="bookList">
            <h4>Список книг</h4>
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Год издания</th>
                    <th scope="col">Удаление</th>
                    </tr>
                </thead>
                <tbody>
                    
                
                {
                    this.state.books.map(function (book) {

                        return <Book key={book.id} book={book} onRemove={remove} />
                    })
                }
                </tbody>
            </table>
            </div>
            <div className="addBook">
                <h4>Добавление новой книги</h4>
                <BookForm onBookSubmit={this.onAddBook} />
            </div>
        </div>;
    }
}

class Home extends React.Component{
    render() {
        return <div className="mainGrid">
            <div>
            <h1>Электронная библиотека</h1>
            <hr/>
            </div>
            
            <BooksList apiUrl="/api/home" />
        </div>;
    }
}

ReactDOM.render(

    <Home/>,
    document.getElementById("content")
);

