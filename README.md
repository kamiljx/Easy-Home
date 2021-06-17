EasyHome.Engine :
1. DataSource

Zawiera wszystkie komponenty aplikacji odpowiedzialne za połączenie z bazą danych:

klasę implementująca wzorzec Unit of Work, która jest pośrednikiem i odpowiada za wszelkie działania z danymi i powinna zawierać w sobie wszystkie repozytoria. Klasę tą powinno się przekazywać przez Dependency Injection do kontrolerów czy serwisów (Przekazując interfejs, a nie samą implementację).
ApplicationDbContext - główny context aplikacji z której korzysta UnitOfWork w swoich działaniach na bazie. Dziedziczy po DbContext i jest główną klasą do obsługi bazy danych ale nie powinna być wykorzystywana poza klasą UoW.
Migrations - historia migracji do bazy danych
Repository - wszystkie repozytoria, które mają odpowiadać za wyciąganie danych z poszczególnych tabel. Na przykład PersonRepository.cs byłoby odpowiedzialne za wyciąganie danych z tabeli Person. Tworzymy interfejs takiego repozytorium (IPersonRepository.cs) i dodajemy do klasy UnitOfWork.cs jako properties. Następnie jeśli chcemy z tego repo skorzystać w jakimś kontrolerze to przekazujemy interfejs
(IUnitOfWork uow) w konstruktorze i odwołujemy się tak: uow.PersonRepository.Metoda()
2.Models

Biblioteka do przechowywania bazowych modeli aplikacji, ViewModeli do szybkiego mapowania, a także interfejsów.

3.Services

Ta biblioteka powinna zawierać w sobie klasy, które służą do obsługi różnych komponentów aplikacji. Np. jeśli potrzebujemy klasę, która będzie odpowiadać za jakieś obliczenia, płatności i inne rzeczy spoza zakresu kontrolerów i repozytoriów to dodajemy ją w tym miejscu. Zazwyczaj klasy, które zawierają tzw. business logic powinny tam lądować.

5.Commons

Tutaj lądują wszystkie tzw. "helpery" i inne uniwersalne metody z których można korzystać w wielu sytuacjach. Przykładem może być klasa DateTimeFormat.cs, która odpowiadałaby za ujednolicenie daty i czasu w całej aplikacji, operacje na datach i inne pomocniczne customowe metody.

EasyHomeWebApp
Frontowa część aplikacji zbudowana na Angularze. Posiada również klasy C# jak Program.cs i Startup.cs
Aplikacja łączy się z częścią backendową za pomocą kontrolerów API.

Aplikacja zawiera komponenty takie jak

forms (Główne metody formularzy używając formControl)
-- Date Form Input (Tworzącą metodę wyboru daty z kalendarza)
-- Text Form Input (Tworzącą metodę wprowadzania danych typu 'text')
Home (landing page aplikacji)
HomeLogin (odpowiadający za logowanie)
-- register (Komponent odpowiadający za tworzenie nowych użytkowników metodą API POST)
nav (Komponent odpowiadający za pasek nawigacji na górze strony)
Member (Profil użytkownika)
Stworzony został także account service odpowiadający za pobieranie i wysyłanie danych używając API odnoszące się do użytkownika

W celu internacjonalizacji projektu wdrożona została metoda wyboru języka dzięki zastosowaniu ngx-translaote oraz i18n. Aplikacja wspiera dwie wersje językowe — polską i angielską. Preferencje językowe zapisywane są w LocalStorage.
