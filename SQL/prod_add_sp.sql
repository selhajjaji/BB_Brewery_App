CREATE OR REPLACE PROCEDURE PROD_ADD_SP(
    p_product_name IN BB_PRODUCT.PRODUCTNAME%TYPE,
    p_description IN BB_PRODUCT.DESCRIPTION%TYPE,
    p_image_filename IN BB_PRODUCT.PRODUCTIMAGE%TYPE,
    p_price IN BB_PRODUCT.PRICE%TYPE,
    p_active IN BB_PRODUCT.ACTIVE%TYPE
)
IS 
    v_max_product NUMBER;
BEGIN
    -- Find the maximum product ID
    SELECT MAX(IDPRODUCT) INTO v_max_product FROM BB_PRODUCT;

    -- Increment for new product
    v_max_product := v_max_product + 1;

    -- Insert new product
    INSERT INTO BB_PRODUCT (IDPRODUCT, PRODUCTNAME, DESCRIPTION, PRODUCTIMAGE, PRICE, ACTIVE)
    VALUES (v_max_product, p_product_name, p_description, p_image_filename, p_price, p_active);

    -- Commit the changes
    COMMIT;
END PROD_ADD_SP;
/

