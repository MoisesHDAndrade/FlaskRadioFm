from pyradios import RadioBrowser
from flask import Flask, render_template, request

app = Flask(__name__)
rb = RadioBrowser()

# radio = rb.search(name="BBC Radio 1", name_exact=True)
# print(radio[0].get('name'))

def radio_search(search):
    radio = rb.search(name=search, name_exact = False)
    return radio


@app.route('/', methods=['POST','GET'])
def home():
    radio_res = None
    if request.method == 'POST':
        search = request.form.get('search')
        if search:
            radio_res = radio_search(search)
        print(radio_res)
    return render_template('index.html', res = radio_res)

if __name__ == '__main__':
    app.run(debug=True)