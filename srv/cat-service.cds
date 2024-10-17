using my.employeeslist as my from '../db/schema';

service CatalogService {
    entity Employees as projection on my.Employees;
}
