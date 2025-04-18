CREATE OR REPLACE PROCEDURE UPDATE_PRODUCT_DESC(
    p_product_id IN BB_PRODUCT.IDPRODUCT%TYPE,
    p_new_description IN BB_PRODUCT.DESCRIPTION%TYPE
)
IS
BEGIN
    UPDATE BB_PRODUCT
    SET DESCRIPTION = p_new_description
    WHERE IDPRODUCT = p_product_id;

    COMMIT;
END UPDATE_PRODUCT_DESC;
/
