package org.shub.productservice.service;

import org.shub.productservice.dto.ProductRequest;
import org.shub.productservice.dto.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    Page<ProductResponse> getAll(Pageable pageable);

    ProductResponse getById(Long id);

    ProductResponse update(Long id, ProductRequest request);

    void delete(Long id);
}
