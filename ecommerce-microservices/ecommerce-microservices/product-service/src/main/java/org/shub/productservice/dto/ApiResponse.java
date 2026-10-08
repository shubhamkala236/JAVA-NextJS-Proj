package org.shub.productservice.dto;

public record ApiResponse<T>(String status, T data) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>("success", data);
    }

    public static <T> ApiResponse<T> error(T data) {
        return new ApiResponse<>("error", data);
    }
}
