from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)
app = Flask(__name__, static_url_path='/static')

# Load water quality data from CSV file
water_quality_data = pd.read_csv('water_quality.csv', encoding='latin-1')

# Define routes for your web pages
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about_us.html')
def about_us():
    return render_template('about_us.html')

@app.route('/clean_water.html')
def clean_water():
    return render_template('clean_water.html')


@app.route('/clever_device.html')
def clever_device():
    return render_template('clever_device.html')

@app.route('/endangered_animal.html')
def endangered_animal():
    return render_template('endangered_animal.html')

@app.route('/contact_us.html')
def contact_us():
    return render_template('contact_us.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Handle login logic here
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    # Handle registration logic here
    return render_template('register.html')

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    # Handle password reset logic here
    return render_template('reset_password.html')



@app.route('/search', methods=['POST'])
def search():
    try:
        # Get the location input from the form data
        location = request.form.get('location')

        # Filter the water quality data based on the entered location
        filtered_data = water_quality_data[water_quality_data['LOCATIONS'] == location]

        # Check if any data is found
        if filtered_data.empty:
            return render_template('no_results.html', location=location)

        # Extract relevant water quality parameters
        water_quality = {
            'Temperature': filtered_data['temp'].values[0],
            'Dissolved Oxygen (mg/l)': filtered_data['D.O. (mg/l)'].values[0],
            'pH': filtered_data['PH'].values[0],
            'Conductivity (µmhos/cm)': filtered_data['CONDUCTIVITY (µmhos/cm)'].values[0],
            'B.O.D. (mg/l)': filtered_data['B.O.D. (mg/l)'].values[0],
            'Nitrate+Nitrite (mg/l)': filtered_data['NITRATENAN N+ NITRITENANN (mg/l)'].values[0],
            'Fecal Coliform (MPN/100ml)': filtered_data['FECAL COLIFORM (MPN/100ml)'].values[0],
            'Total Coliform (MPN/100ml)': filtered_data['TOTAL COLIFORM (MPN/100ml)Mean'].values[0]
        }

        # Find all rivers in the given location
        rivers_in_location = filtered_data['STATION CODE'].tolist()

        return render_template('search_result.html', location=location, water_quality=water_quality, rivers=rivers_in_location)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
