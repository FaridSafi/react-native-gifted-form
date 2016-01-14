Form component for React-Native


![](https://raw.githubusercontent.com/FaridSafi/react-native-gifted-form/master/capture/signup.gif)


### Example

```js
var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');

var Component = React.createClass({
  render() {

    <GiftedForm
      formName='signupForm' // GiftedForm instances that use the same name will also share the same states

      openModal={(route) => {
        navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
      }}
      
      clearOnClose: false, // delete the values of the form when unmounted
      
      defaults={{
        /*
        username: 'Farid',
        'gender{M}': true,
        password: 'abcdefg',
        country: 'FR',
        birthday: new Date(((new Date()).getFullYear() - 18)+''),
        */
      }}
  
      validators={{
        fullName: {
          title: 'Full name',
          validate: [{
            validator: 'isLength',
            arguments: [1, 23],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
          }]
        },
        username: {
          title: 'Username',
          validate: [{
            validator: 'isLength',
            arguments: [3, 16],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
          },{
            validator: 'matches',
            arguments: /^[a-zA-Z0-9]*$/,
            message: '{TITLE} can contains only alphanumeric characters'
          }]
        },
        password: {
          title: 'Password',
          validate: [{
            validator: 'isLength',
            arguments: [6, 16],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
          }]
        },
        emailAddress: {
          title: 'Email address',
          validate: [{
            validator: 'isLength',
            arguments: [6, 255],
          },{
            validator: 'isEmail',
          }]
        },
        bio: {
          title: 'Biography',
          validate: [{
            validator: 'isLength',
            arguments: [0, 512],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
          }]
        },
        gender: {
          title: 'Gender',
          validate: [{
            validator: (...args) => {
              if (args[0] === undefined) {
                return false;
              }
              return true;
            },
            message: '{TITLE} is required',
          }]
        },
        birthday: {
          title: 'Birthday',
          validate: [{
            validator: 'isBefore',
            arguments: [moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
            message: 'You must be at least 18 years old'
          }, {
            validator: 'isAfter',
            arguments: [moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
            message: '{TITLE} is not valid'
          }]
        },
        country: {
          title: 'Country',
          validate: [{
            validator: 'isLength',
            arguments: [2],
            message: '{TITLE} is required'
          }]
        },
      }}
    >

      <GiftedForm.SeparatorWidget />
      <GiftedForm.TextInputWidget
        name='fullName' // mandatory
        title='Full name'
  
        image={require('../../assets/icons/color/user.png')}

        placeholder='Marco Polo'
        clearButtonMode='while-editing'
      />


      <GiftedForm.TextInputWidget
        name='username'
        title='Username'
        image={require('../../assets/icons/color/contact_card.png')}

        placeholder='MarcoPolo'
        clearButtonMode='while-editing'

        onTextInputFocus={(currentText = '') => {
          if (!currentText) {
            let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
            if (fullName) {
              return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
            }
          }
          return currentText;
        }}
      />

      <GiftedForm.TextInputWidget
        name='password' // mandatory
        title='Password'

        placeholder='******'


        clearButtonMode='while-editing'
        secureTextEntry={true}
        image={require('../../assets/icons/color/lock.png')}
      />

      <GiftedForm.TextInputWidget
        name='emailAddress' // mandatory
        title='Email address'
        placeholder='example@nomads.ly'

        keyboardType='email-address'

        clearButtonMode='while-editing'

        image={require('../../assets/icons/color/email.png')}
      />
    
      <GiftedForm.SeparatorWidget />
    
      <GiftedForm.ModalWidget
        title='Gender'
        displayValue='gender'
        image={require('../../assets/icons/color/gender.png')}
      >
        <GiftedForm.SeparatorWidget />

        <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
          <GiftedForm.OptionWidget image={require('../../assets/icons/color/female.png')} title='Female' value='F'/>
          <GiftedForm.OptionWidget image={require('../../assets/icons/color/male.png')} title='Male' value='M'/>
        </GiftedForm.SelectWidget>
      </GiftedForm.ModalWidget>

      <GiftedForm.ModalWidget
        title='Birthday'
        displayValue='birthday'
        image={require('../../assets/icons/color/birthday.png')}

        scrollEnabled={false}
      >
        <GiftedForm.SeparatorWidget/>
        <GiftedForm.DatePickerIOSWidget
          name='birthday'
          mode='date'
    
          getDefaultDate={() => {
            return new Date(((new Date()).getFullYear() - 18)+'');
          }}
        />
      </GiftedForm.ModalWidget>
      <GiftedForm.ModalWidget
        title='Country'
        displayValue='country'
        image={require('../../assets/icons/color/passport.png')}
        scrollEnabled={false}
    
      >
        <GiftedForm.SelectCountryWidget 
          code='alpha2' 
          name='country' 
          title='Country' 
          autoFocus={true}
        />
      </GiftedForm.ModalWidget>


      <GiftedForm.ModalWidget
        title='Biography'
        displayValue='bio'

        image={require('../../assets/icons/color/book.png')}

        scrollEnabled={true} // true by default
      >
        <GiftedForm.SeparatorWidget/>
        <GiftedForm.TextAreaWidget
          name='bio'

          autoFocus={true}

          placeholder='Something interesting about yourself'
        />
      </GiftedForm.ModalWidget>
      


      <GiftedForm.SubmitWidget
        title='Sign up'
        widgetStyles={{
          submitButton: {
            backgroundColor: themes.mainColor,
          }
        }}
        onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
          if (isValid === true) {
            // prepare object
            values.gender = values.gender[0];
            values.birthday = moment(values.birthday).format('YYYY-MM-DD');
      
            /* Implement the request to your server using values variable
            ** then you can do:
            ** postSubmit(); // disable the loader
            ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
            ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
            ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
            */
          }
        }}
    
      />

      <GiftedForm.NoticeWidget 
        title='By signing up, you agree to the Terms of Service and Privacy Policity.'
      />

      <GiftedForm.HiddenWidget name='tos' value={true} />

    </GiftedForm>
  }
});
```


### Available widgets
TextInputWidget - A text input
TextAreaWidget - A text area
GooglePlacesWidget - A Google Places picker based on react-native-google-places-autocomplete
ModalWidget - A route opener for nested forms
GroupWidget - A widgets container with a title
HiddenWidget - A non-displayed widget. The value will be passed to SubmitWidget
LoadingWidget - A loader
RowWidget - A touchable row with title/image
SelectCountryWidget - A country picker. Flags made by www.IconDrawer.com
SelectWidget - A select menu
SeparatorWidget - A 10px widgets separator
SubmitWidget - A submit button that trigger form validators and error displaying
SwitchWidget - A switch
DatePickerIOSWidget - Date picker for iOS
NoticeWidget - A notice information - PR wanted for onPress handler
DayPickerWidget (Not ready for production) - A cross platform date picker. If you want to use it please submit a PR with ISO weeks support (weeks starting on monday) and a prop to set the years range


See the sources for props details


### Your own widget
Widgets must implement the mixin GiftedForm.WidgetMixin 
See /widgets/TextAreaWidget.js for example


### Contributing
Pull requests are welcome


### License

[MIT](LICENSE)

Feel free to ask me questions on Twitter [@FaridSafi](https://www.twitter.com/FaridSafi) !
