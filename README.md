EasyHome.Engine :
1. DataSource

Contains all the application components responsible for connecting to the database:

the class implementing the Unit of Work pattern, which is the middleman and is responsible for all actions with the data and should include all repositories. This class should be passed through Dependency Injection to controllers or services (passing the interface, not the implementation itself).
ApplicationDbContext - the main application context that UnitOfWork uses in its operations on the database. It inherits from DbContext and it is the main class for handling the database but it should not be used outside the UnitOfWork class.
Migrations - the history of migrations to the database
Repository - all repositories to be responsible for pulling data from individual tables. For example, PersonRepository.cs would be responsible for pulling data from the Person table. We create an interface to such a repository (IPersonRepository.cs) and add it to the UnitOfWork.cs class as properties. Then, if we want to use this repository in some controller, we pass the interface
(IUnitOfWork uow) in the constructor and refer to it as follows: uow.PersonRepository.Method()
2.Models

Library to store the underlying application models, ViewModels for quick mapping, and interfaces.

3.Services

This library should encapsulate the classes that are used to handle the various components of the application. E.g. if we need a class that will be responsible for some calculations, payments and other things outside the scope of controllers and repositories then we add it here. Usually classes that contain so called business logic should land there.

5.Commons

This is where all the so-called "helpers" and other universal methods that can be used in many situations land. An example would be the DateTimeFormat.cs class, which would be responsible for standardizing the date and time throughout the application, date operations and other auxiliary custom methods.

EasyHomeWebApp
The front end of the application built on Angular. It also has C# classes like Program.cs and Startup.cs
The application connects to the backend part using API controllers.

# The application contains components such as.

* Forms (Main form methods using formControl)
** Date Form Input (Reusable component for selecting date from calendar)
** Text Form Input (Reusable component for entering text data)
** Material Text Form Input (Reusable component ng-Material)

* Home (landing page of the application)
* HomeLogin (Component responsible for login)
* Register (API POST component for creating new users). 
* Member (User profile)
* Nav (bootstrap navbar)

## Dashboard (component visible after login, which allows users to manage the service)
* Material-Nav (navbar & sidenav - mat-toolbar & mat-sidenav)
* Messages (Component which is responsible for chat between users)
* Options (Component containing properties, personalization of the service by the user) 
* * `RealEstate` (Component responsible for displaying the properties assigned to the profile)
* ** Add-RealEstate (OpenDialog component for adding real estate)
* ** Add-RealEstate-Detail (Component that returns the property details) 
** Get-Rentiers (component that returns tenants)
* ** Real-Estate-Payment (component for creating payments) 
* ** Add-Real-Estate-Payment (component for creating payments)  

## Guard
* Auth (Guard that checks if user is logged in)

## Interceptors 
* JWT 
* Loading

## Models
* AddRentierToRealEstate
* Announcement
* Member
* Message
* Pagination
* Photo
* RealEstate
* RealEstateUser
* user 

## Services
* Account
* Announcement
* Busy
* Confirm
* Members
* Message
* PaginatorHelper
* Payments
* Presence
* RealEstate
* Theme

In order to internationalize the project, a language selection method has been implemented by using ngx-translaote and i18n. The application supports two language versions - Polish and English. Language preferences are saved in LocalStorage.
 Translated with www.DeepL.com/Translator (free version)
