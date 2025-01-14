package com.mayaank.ecommerce.config;
import com.mayaank.ecommerce.entity.Country;
import com.mayaank.ecommerce.entity.Product;
import com.mayaank.ecommerce.entity.ProductCategory;
import com.mayaank.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager=theEntityManager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {


        HttpMethod[] theUnsupportedActions = {};

        // disable HTTP methods for Product: PUT, POST, DELETE and PATC
        // disable HTTP methods for ProductCategory: PUT, POST, DELETE and PATCH
        extracted(ProductCategory.class,config, theUnsupportedActions);
        extracted(Product.class,config, theUnsupportedActions);
        extracted(Country.class,config, theUnsupportedActions);
        extracted(State.class,config, theUnsupportedActions);
        exposeIds(config);



    }

    private static void extracted(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList<>();

        for(EntityType temp:entities)
            entityClasses.add(temp.getJavaType());

        Class[] domainTypes =entityClasses.toArray((new Class[0]));

        config.exposeIdsFor((domainTypes));

    }
}