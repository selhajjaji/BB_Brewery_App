CREATE OR REPLACE PROCEDURE TAX_COST_SP(
    p_state IN BB_TAX.STATE%TYPE,
    p_subtotal IN NUMBER,
    p_tax OUT NUMBER
)
IS
    v_tax_rate NUMBER;
BEGIN
    -- Get the tax rate for the given state
    SELECT TAXRATE INTO v_tax_rate
    FROM BB_TAX
    WHERE STATE = p_state;

    -- Calculate tax
    p_tax := p_subtotal * v_tax_rate;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_tax := 0; -- No tax if state is not found in the table
END TAX_COST_SP;
/
