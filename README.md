# Assignment 2

Health Hub allows users to book in-clinic appointments with doctors, purchase medicine, view blogs and access forum where the questions are answered by medical professionals.

* *Date Created*: 07 Jun 2020
* *Last Modification Date*: 15 Jun 2020

## Authors

* [Avinash Gazula](av530575@dal.ca) 

## Getting Started

### Prerequisites

NodeJs and Angular must be installed on the system

### Installing

* Clone the repository by using the provided GitLab link
* Open the terminal and go to the directory where package.json is located
* Install the node modules using the following command
	 `npm install` or `npm i` 
* Start the angular application by using the following command
	 `ng serve`


### Built With

* [Angular](https://angular.io/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [Bootstrap](https://getbootstrap.com/) - Used for styling
* [Angular Material](https://material.angular.io/) - Material UI componengts for angular

### Design Justifications

* Angular was the preffered framework for the development of the website because of the straight forward 2-way binding and routing it provides. TyeScript is more robust.
* Material UI was used for the components because it offers a streamlined and minimalistic layout. Material UI is widely used also its familiar to the end users.
* Bootstrap was used because its easy to set up and configure laypouts. 
* A dark blue colour (#001F3F) was chosen as the primary color because it constrasts well with the white background. 
* Roboto font was used for the components because it is the recommended font for Material UI

### Pages Built

* Login - Can be accessed using the icon on the header
* Signup - Can be accessed using the icon on the header
* Home Page - https://health-hub-a2.herokuapp.com/
* Consult Doctor - https://health-hub-a2.herokuapp.com/consult
* Doctor's Profile - https://health-hub-a2.herokuapp.com/doctor

### Directory Structure

`src` - source folder contains all of our code

`app/components` - Components directory has directories of all the components

`components/doctor` - This folder contains all the files related for the doctor page

`components/doctor-profile` - This folder contains files related to the doctor's profile page

`components/header` - This folder contains files related to the toolbar of the application

`components/home` - This folder contains files related to home screen after logging in feature

`components/login` - This folder contains files related to the login page

`components/register` - This folder contains files related to the registration page

`helpers` - This folder contains all the helper methods


## Deployment

App is deployed on heroku by linking github repository. Automatic deploy is enabled so that it builds as soon as a commit has been made.

### Heroku URL

https://health-hub-a2.herokuapp.com/

### Gitlab Link

https://git.cs.dal.ca/gazula/a2_avinash_gazula

### Github Link

https://github.com/avinashgazula/HealthHub-A2


## Sources Used

[1] "Angular Material. [Online]. Available: https://material.angular.io/. [Accessed: 07- Jun- 2020].

[2] "Beatiful Free Images & Pictures | Unsplash". [Online]. Available: https://unsplash.com/. [Accessed: 09-Jun-2020].

[3] "Material Icons". [Online]. Available: https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/ [Accessed: 09-Jun-2020]

[4] "Lorem Ipsum". [Online]. Available: https://www.lipsum.com/ [Accessed: 13-Jun-2020]

[5] "A complete guide to routing in Angular". [Online]. Available: https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/ [Accessed: 13-Jun-2020]

### /src/app/app-routingmodule.ts

```typescript
{ path: 'doctor', component: DoctorProfileComponent },
{ path: 'consult', component: DoctorComponent },
{ path: '', pathMatch: 'full', component: HomeComponent }
```
- [How] The code in [5](https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/ ) was implemented by Ahmed Bouchefra
- [Why] [5](https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/ ) Code was used to route to components
- [How] [5](https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/ ) Code was modified by Avinash Gazula


[6] "Angular Flex Layout". [Online]. Available: https://github.com/angular/flex-layout [Accessed: 12-Jun-2020]

[7] "Styling Scrollbars with CSS: The Modern Way to Style Scrollbars". [Online]. Available: https://alligator.io/css/css-scrollbars/ [Accessed: 13-Jun-2020]

### /src/app/components/doctor/doctor.component.css
### /src/app/components/doctor-profile/doctor-profile.component.css
### /src/app/components/home/home.component.css

```css
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: #F5F5F5;
  border-radius: 20px;
}
*::-webkit-scrollbar-thumb {
  background-color: #001F3F;
  border-radius: 20px;
  border: 3px solid #F5F5F5;
}
```

- [How] The code in [7](https://alligator.io/css/css-scrollbars/) was implemented by William Le
- [Why] [7](https://alligator.io/css/css-scrollbars/) Code was used to create a custom scroll bar
- [How] [7](https://alligator.io/css/css-scrollbars/) Code was modified by Avinash Gazula

[8] "Angular 7 - Reactive Forms Validation". [Online]. Available: https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example [Accessed: 15-Jun-2020]

### /src/app/helpers/MatchPasswords.ts

```javascript
export function MatchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
        const control1 = formGroup.controls[password];
        const control2 = formGroup.controls[confirmPassword];

        if (control2.errors && !control2.errors.mustMatch) {
            return;
        }

        if (control1.value !== control2.value) {
            control2.setErrors({ match: true });
        } else {
            control2.setErrors(null);
        }
    }
}
```

- [How] The code in [8](https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example) was implemented by Jason Watmore
- [Why] [8](https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example) Code was used to create a custom validator to match passwords
- [How] [8](https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example) Code was modified by Avinash Gazula

[9] "How to Deploy Angular Application to Heroku". [Online]. Available: https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147 [Accessed: 14-Jun-2020]



## Image Sources

All the images used in the Application were taken from Unsplash.com and can be used for both commercial and non commercial purposes with no credit required.

[1] "Doctor". [Image]. Available: https://unsplash.com/photos/DPEPYPBZpB8 [Accessed: 12-Jun-2020]

[2] "Doctor". [Image]. Available: https://unsplash.com/photos/FVh_yqLR9eA [Accessed: 12-Jun-2020]

[3] "Doctor". [Image]. Available: https://unsplash.com/photos/7bMdiIqz_J4 [Accessed: 12-Jun-2020]

[4] "Doctor". [Image]. Available: https://unsplash.com/photos/7bMdiIqz_J4 [Accessed: 12-Jun-2020]

[5] "Doctor". [Image]. Available: https://unsplash.com/photos/1RskUx-C0A8 [Accessed: 12-Jun-2020]

[6] "Doctor". [Image]. Available: https://unsplash.com/photos/wzV17t-k3k0 [Accessed: 12-Jun-2020]

## Acknowledgements
* https://www.traversymedia.com/