/*
 * The MIT License
 *
 * Copyright (c) 2015-2023 Richard Greenlees
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * Contains the definition of a Vector comprising 3 floats and associated
 * transformations.
 *
 * @author Richard Greenlees
 * @author Kai Burjack
 * @author F. Neurath
 */
class Vector3 implements Externalizable, Cloneable, Vector3c {

    private static serialVersionUID: number = 1;

    /**
     * The x component of the vector.
     */
    public x: number;
    /**
     * The y component of the vector.
     */
    public y: number;
    /**
     * The z component of the vector.
     */
    public z: number;

    /**
     * Create a new {@link Vector3} of <code>(0, 0, 0)</code>.
     */
    public Vector3() {
    }

    /**
     * Create a new {@link Vector3} and initialize all three components with the given value.
     *
     * @param d
     *          the value of all three components
     */
    public Vector3(d: number) {
        this.x = d;
        this.y = d;
        this.z = d;
    }

    /**
     * Create a new {@link Vector3} with the given component values.
     * 
     * @param x
     *          the value of x
     * @param y
     *          the value of y
     * @param z
     *          the value of z
     */
    public Vector3(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Create a new {@link Vector3} with the same values as <code>v</code>.
     * 
     * @param v
     *          the {@link Vector3c} to copy the values from
     */
    public Vector3(v: Vector3c) {
        this.x = v.x();
        this.y = v.y();
        this.z = v.z();
    }

    /**
     * Create a new {@link Vector3} with the first two components from the
     * given <code>v</code> and the given <code>z</code>
     * 
     * @param v
     *          the {@link Vector2c} to copy the values from
     * @param z
     *          the z component
     */
    public Vector3(v: Vector2c, z: number) {
        this.x = v.x();
        this.y = v.y();
        this.z = z;
    }

    /**
     * Create a new {@link Vector3} with the first two components from the
     * given <code>v</code> and the given <code>z</code>
     * 
     * @param v
     *          the {@link Vector2ic} to copy the values from
     * @param z
     *          the z component
     */
    public Vector3(v: Vector2ic, z: number) {
        this.x = v.x();
        this.y = v.y();
        this.z = z;
    }

    /**
     * Create a new {@link Vector3} and initialize its three components from the first
     * three elements of the given array.
     * 
     * @param xyz
     *          the array containing at least three elements
     */
    public Vector3(xyz: number[]) {
        this.x = xyz[0];
        this.y = xyz[1];
        this.z = xyz[2];
    }

    //WARNING: NIO WAS REMOVED HERE!

    public x(): number {
        return this.x;
    }

    public y(): number {
        return this.y;
    }

    public z(): number {
        return this.z;
    }

    /**
     * Copy the <code>(x, y)</code> components of <code>this</code> into the supplied <code>dest</code> vector
     * and return it.
     *
     * @param dest
     *      will hold the result
     * @return dest
     */
    public xy(dest: Vector2): Vector2 {
        return dest.set(x, y);
    }

    /**
     * Set this vector to the <code>(x, y, z)</code> components of <code>v</code>.
     * <p>
     * Note that due to the given vector <code>v</code> storing the components in double-precision,
     * there is the possibility to lose precision.
     *
     * @param v
     *        the vector to copy from
     * @return this
     */
    public set(v: Vector4c): Vector3 {
        this.x = (float) v.x();
        this.y = (float) v.y();
        this.z = (float) v.z();
        return this;
    }

    /**
     * Set the x, y and z components to match the supplied vector.
     * 
     * @param v
     *          contains the values of x, y and z to set
     * @return this
     */
    public set(v: Vector3c): Vector3 {
        if (v == this)
            return this;
        this.x = v.x();
        this.y = v.y();
        this.z = v.z();
        return this;
    }

    /**
     * Set the first two components from the given <code>v</code>
     * and the z component from the given <code>z</code>
     *
     * @param v
     *          the {@link Vector2c} to copy the values from
     * @param z
     *          the z component
     * @return this
     */
    public set(v: Vector2c, z: number): Vector3 {
        this.x = v.x();
        this.y = v.y();
        this.z = z;
        return this;
    }


    /**
     * Set the x, y, and z components to the supplied value.
     *
     * @param d
     *          the value of all three components
     * @return this
     */
    public set(d: number): Vector3 {
        this.x = d;
        this.y = d;
        this.z = d;
        return this;
    }

    /**
     * Set the x, y and z components to the supplied values.
     * 
     * @param x
     *          the x component
     * @param y
     *          the y component 
     * @param z
     *          the z component
     * @return this
     */
    public set(x: number, y: number, z: number): Vector3 {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * Set the three components of this vector to the first three elements of the given array.
     * 
     * @param xyz
     *          the array containing at least three elements
     * @return this
     */
    public set(xyz: number[]): Vector3 {
        this.x = xyz[0];
        this.y = xyz[1];
        this.z = xyz[2];
        return this;
    }

    // WARNING: NIO REMOVED HERE!
    
    // WARNING: UNSAFE REMOVED HERE!

    /**
     * Set the value of the specified component of this vector.
     *
     * @param component
     *          the component whose value to set, within <code>[0..2]</code>
     * @param value
     *          the value to set
     * @return this
     * @throws IllegalArgumentException if <code>component</code> is not within <code>[0..2]</code>
     */
    public setComponent(component: number, value: number): Vector3 {
        switch (component) {
            case 0:
                x = value;
                break;
            case 1:
                y = value;
                break;
            case 2:
                z = value;
                break;
            default:
                throw new IllegalArgumentException();
        }
        return this;
    }

    /**
     * Subtract the supplied vector from this one and store the result in <code>this</code>.
     * 
     * @param v
     *          the vector to subtract
     * @return this
     */
    public sub(v: Vector3c): Vector3  {
        return sub(v, this);
    }

    public sub(v: Vector3c, dest: Vector3): Vector3 {
        dest.x = x - v.x();
        dest.y = y - v.y();
        dest.z = z - v.z();
        return dest;
    }

    /**
     * Decrement the components of this vector by the given values.
     * 
     * @param x
     *          the x component to subtract
     * @param y
     *          the y component to subtract
     * @param z
     *          the z component to subtract
     * @return this
     */
    public sub(x: number, y: number, z: number): Vector3 {
        return sub(x, y, z, this);
    }

    public sub(x: number, y: number, z: number, dest: Vector3): Vector3 {
        dest.x = this.x - x;
        dest.y = this.y - y;
        dest.z = this.z - z;
        return dest;
    }

    /**
     * Add the supplied vector to this one.
     * 
     * @param v
     *          the vector to add
     * @return this
     */
    public add(v: Vector3c): Vector3 {
        return add(v, this);
    }

    public add(v: Vector3c, dest: Vector3): Vector3 {
        dest.x = this.x + v.x();
        dest.y = this.y + v.y();
        dest.z = this.z + v.z();
        return dest;
    }

    /**
     * Increment the components of this vector by the given values.
     * 
     * @param x
     *          the x component to add
     * @param y
     *          the y component to add
     * @param z
     *          the z component to add
     * @return this
     */
    public add(x: number, y: number, z: number): Vector3 {
        return add(x, y, z, this);
    }

    public add(x: number, y: number, z: number, dest: Vector3): Vector3 {
        dest.x = this.x + x;
        dest.y = this.y + y;
        dest.z = this.z + z;
        return dest;
    }

    /**
     * Add the component-wise multiplication of <code>a * b</code> to this vector.
     * 
     * @param a
     *          the first multiplicand
     * @param b
     *          the second multiplicand
     * @return this
     */
    public fma(a: Vector3c, b: Vector3c): Vector3 {
        return fma(a, b, this);
    }

    /**
     * Add the component-wise multiplication of <code>a * b</code> to this vector.
     * 
     * @param a
     *          the first multiplicand
     * @param b
     *          the second multiplicand
     * @return this
     */
    public fma(a: number, b: Vector3c): Vector3 {
        return fma(a, b, this);
    }

    public fma(a: Vector3c, b: Vector3c, dest: Vector3): Vector3 {
        dest.x = Math.fma(a.x(), b.x(), x);
        dest.y = Math.fma(a.y(), b.y(), y);
        dest.z = Math.fma(a.z(), b.z(), z);
        return dest;
    }

    public fma(a: number, b: Vector3c, dest: Vector3): Vector3 {
        dest.x = Math.fma(a, b.x(), x);
        dest.y = Math.fma(a, b.y(), y);
        dest.z = Math.fma(a, b.z(), z);
        return dest;
    }

    /**
     * Add the component-wise multiplication of <code>this * a</code> to <code>b</code>
     * and store the result in <code>this</code>.
     * 
     * @param a
     *          the multiplicand
     * @param b
     *          the addend
     * @return this
     */
    public mulAdd(a: Vector3c, b: Vector3c): Vector3 {
        return mulAdd(a, b, this);
    }

    /**
     * Add the component-wise multiplication of <code>this * a</code> to <code>b</code>
     * and store the result in <code>this</code>.
     * 
     * @param a
     *          the multiplicand
     * @param b
     *          the addend
     * @return this
     */
    public mulAdd(a: number, b: Vector3c): Vector3 {
        return mulAdd(a, b, this);
    }

    public mulAdd(a: Vector3c, b: Vector3c, dest: Vector3): Vector3 {
        dest.x = Math.fma(x, a.x(), b.x());
        dest.y = Math.fma(y, a.y(), b.y());
        dest.z = Math.fma(z, a.z(), b.z());
        return dest;
    }

    public mulAdd(a: number, b: Vector3c, dest: Vector3): Vector3 {
        dest.x = Math.fma(x, a, b.x());
        dest.y = Math.fma(y, a, b.y());
        dest.z = Math.fma(z, a, b.z());
        return dest;
    }

    /**
     * Multiply this vector component-wise by another Vector3c.
     * 
     * @param v
     *          the vector to multiply by
     * @return this
     */
    public mul(v: Vector3c): Vector3 {
        return mul(v, this);
    }

    public mul(v: Vector3c, dest: Vector3): Vector3 {
        dest.x = x * v.x();
        dest.y = y * v.y();
        dest.z = z * v.z();
        return dest;
    }

    /**
     * Divide this vector component-wise by another Vector3c.
     * 
     * @param v
     *          the vector to divide by
     * @return this
     */
    public div(v: Vector3c): Vector3 {
        return div(v, this);
    }

    public Vector3 div(Vector3c v, Vector3 dest) {
        dest.x = x / v.x();
        dest.y = y / v.y();
        dest.z = z / v.z();
        return dest;
    }

    public Vector3 mulProject(Matrix4fc mat, float w, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        float invW = 1.0f / Math.fma(mat.m03(), x, Math.fma(mat.m13(), y, Math.fma(mat.m23(), z, mat.m33() * w)));
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30() * w))) * invW;
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31() * w))) * invW;
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32() * w))) * invW;
        return dest;
    }

    /**
     * Multiply the given matrix <code>mat</code> with this vector and perform perspective division.
     * <p>
     * This method uses <code>w=1.0</code> as the fourth vector component.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulProject(Matrix4fc mat) {
        int prop = mat.properties();
        if ((prop & Matrix4fc.PROPERTY_IDENTITY) != 0)
            return this;
        if ((prop & Matrix4fc.PROPERTY_TRANSLATION) != 0)
            return mulProjectTranslation(mat, this);
        if ((prop & Matrix4fc.PROPERTY_AFFINE) != 0)
            return mulProjectAffine(mat, this);
        return mulProjectGeneric(mat, this);
    }
    public Vector3 mulProject(Matrix4fc mat, Vector3 dest) {
        int prop = mat.properties();
        if ((prop & Matrix4fc.PROPERTY_IDENTITY) != 0)
            return dest.set(this);
        if ((prop & Matrix4fc.PROPERTY_TRANSLATION) != 0)
            return mulProjectTranslation(mat, dest);
        if ((prop & Matrix4fc.PROPERTY_AFFINE) != 0)
            return mulProjectAffine(mat, dest);
        return mulProjectGeneric(mat, dest);
    }
    /**
     * Multiply the given matrix <code>mat</code> with this vector and perform perspective division.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only a translation.
     * <p>
     * This method uses <code>w=1.0</code> as the fourth vector component.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulProjectTranslation(Matrix4fc mat) {
        return mulPositionTranslation(mat, this);
    }
    public Vector3 mulProjectTranslation(Matrix4fc mat, Vector3 dest) {
        return mulPositionTranslation(mat, dest);
    }
    /**
     * Multiply the given matrix <code>mat</code> with this vector and perform perspective division.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only a translation.
     * <p>
     * This method uses <code>w=1.0</code> as the fourth vector component.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulProjectTranslation(Matrix4dc mat) {
        return mulPositionTranslation(mat, this);
    }
    public Vector3 mulProjectTranslation(Matrix4dc mat, Vector3 dest) {
        return mulPositionTranslation(mat, dest);
    }
    /**
     * Multiply the given matrix <code>mat</code> with this vector and perform perspective division.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only an affine transformation.
     * <p>
     * This method uses <code>w=1.0</code> as the fourth vector component.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulProjectAffine(Matrix4fc mat) {
        return mulProjectAffine(mat, this);
    }
    public Vector3 mulProjectAffine(Matrix4fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z)) + mat.m30();
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z)) + mat.m31();
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, mat.m22() * z)) + mat.m32();
        return dest;
    }
    /**
     * Multiply the given matrix <code>mat</code> with this vector and perform perspective division.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only an affine transformation.
     * <p>
     * This method uses <code>w=1.0</code> as the fourth vector component.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulProjectAffine(Matrix4dc mat) {
        return mulProjectAffine(mat, this);
    }
    public Vector3 mulProjectAffine(Matrix4dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = (float) (Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z)) + mat.m30());
        dest.y = (float) (Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z)) + mat.m31());
        dest.z = (float) (Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, mat.m22() * z)) + mat.m32());
        return dest;
    }
    /**
     * Multiply the given matrix <code>mat</code> with this vector and perform perspective division.
     * <p>
     * This method makes no assumptions about the properties of the matrix <code>mat</code>.
     * <p>
     * This method uses <code>w=1.0</code> as the fourth vector component.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulProjectGeneric(Matrix4fc mat) {
        return mulProjectGeneric(mat, this);
    }
    public Vector3 mulProjectGeneric(Matrix4fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        float invW = 1.0f / Math.fma(mat.m03(), x, Math.fma(mat.m13(), y, Math.fma(mat.m23(), z, mat.m33())));
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30()))) * invW;
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31()))) * invW;
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32()))) * invW;
        return dest;
    }
    /**
     * Multiply the given matrix <code>mat</code> with this vector and perform perspective division.
     * <p>
     * This method makes no assumptions about the properties of the matrix <code>mat</code>.
     * <p>
     * This method uses <code>w=1.0</code> as the fourth vector component.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulProjectGeneric(Matrix4dc mat) {
        return mulProjectGeneric(mat, this);
    }
    public Vector3 mulProjectGeneric(Matrix4dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        double invW = 1.0f / Math.fma(mat.m03(), x, Math.fma(mat.m13(), y, Math.fma(mat.m23(), z, mat.m33())));
        dest.x = (float) (Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30()))) * invW);
        dest.y = (float) (Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31()))) * invW);
        dest.z = (float) (Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32()))) * invW);
        return dest;
    }

    /**
     * Multiply the given matrix with this vector and store the result in <code>this</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix
     * @return this
     */
    public Vector3 mul(Matrix3fc mat) {
        return mul(mat, this);
    }

    public Vector3 mul(Matrix3fc mat, Vector3 dest) {
        float lx = x, ly = y, lz = z;
        dest.x = Math.fma(mat.m00(), lx, Math.fma(mat.m10(), ly, mat.m20() * lz));
        dest.y = Math.fma(mat.m01(), lx, Math.fma(mat.m11(), ly, mat.m21() * lz));
        dest.z = Math.fma(mat.m02(), lx, Math.fma(mat.m12(), ly, mat.m22() * lz));
        return dest;
    }

    /**
     * Multiply the given matrix with this vector and store the result in <code>this</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix
     * @return this
     */
    public Vector3 mul(Matrix3dc mat) {
        return mul(mat, this);
    }

    public Vector3 mul(Matrix3dc mat, Vector3 dest) {
        float lx = x, ly = y, lz = z;
        dest.x = (float) Math.fma(mat.m00(), lx, Math.fma(mat.m10(), ly, mat.m20() * lz));
        dest.y = (float) Math.fma(mat.m01(), lx, Math.fma(mat.m11(), ly, mat.m21() * lz));
        dest.z = (float) Math.fma(mat.m02(), lx, Math.fma(mat.m12(), ly, mat.m22() * lz));
        return dest;
    }

    /**
     * Multiply the given matrix with this vector and store the result in <code>this</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix
     * @return this
     */
    public Vector3 mul(Matrix3x2fc mat) {
        return mul(mat, this);
    }

    public Vector3 mul(Matrix3x2fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z));
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z));
        dest.z = z;
        return dest;
    }

    /**
     * Multiply the given matrix with this vector and store the result in <code>this</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix
     * @return this
     */
    public Vector3 mul(Matrix3x2dc mat) {
        return mul(mat, this);
    }

    public Vector3 mul(Matrix3x2dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = (float) Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z));
        dest.y = (float) Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z));
        dest.z = z;
        return dest;
    }

    /**
     * Multiply the transpose of the given matrix with this vector store the result in <code>this</code>.
     * <p>
     * Note that this method performs the operation <code>M^T * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix
     * @return this
     */
    public Vector3 mulTranspose(Matrix3fc mat) {
        return mulTranspose(mat, this);
    }

    public Vector3 mulTranspose(Matrix3fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m01(), y, mat.m02() * z));
        dest.y = Math.fma(mat.m10(), x, Math.fma(mat.m11(), y, mat.m12() * z));
        dest.z = Math.fma(mat.m20(), x, Math.fma(mat.m21(), y, mat.m22() * z));
        return dest;
    }

    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPosition(Matrix4fc mat) {
        int prop = mat.properties();
        if ((prop & Matrix4fc.PROPERTY_IDENTITY) != 0)
            return this;
        if ((prop & Matrix4fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, this);
        return mulPositionGeneric(mat, this);
    }
    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPosition(Matrix4dc mat) {
        int prop = mat.properties();
        if ((prop & Matrix4fc.PROPERTY_IDENTITY) != 0)
            return this;
        if ((prop & Matrix4fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, this);
        return mulPositionGeneric(mat, this);
    }
    public Vector3 mulPosition(Matrix4fc mat, Vector3 dest) {
        int prop = mat.properties();
        if ((prop & Matrix4fc.PROPERTY_IDENTITY) != 0)
            return dest.set(this);
        if ((prop & Matrix4fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, dest);
        return mulPositionGeneric(mat, dest);
    }
    public Vector3 mulPosition(Matrix4dc mat, Vector3 dest) {
        int prop = mat.properties();
        if ((prop & Matrix4fc.PROPERTY_IDENTITY) != 0)
            return dest.set(this);
        if ((prop & Matrix4fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, dest);
        return mulPositionGeneric(mat, dest);
    }
    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only a translation.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionTranslation(Matrix4x3fc mat) {
        return mulPositionTranslation(mat, this);
    }
    public Vector3 mulPositionTranslation(Matrix4x3fc mat, Vector3 dest) {
        float rx = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        float ry = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        float rz = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        dest.x = rx;
        dest.y = ry;
        dest.z = rz;
        return dest;
    }
    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only a translation.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionTranslation(Matrix4x3dc mat) {
        return mulPositionTranslation(mat, this);
    }
    public Vector3 mulPositionTranslation(Matrix4x3dc mat, Vector3 dest) {
        float rx = (float) Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        float ry = (float) Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        float rz = (float) Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        dest.x = rx;
        dest.y = ry;
        dest.z = rz;
        return dest;
    }
    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only a translation.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionTranslation(Matrix4fc mat) {
        return mulPositionTranslation(mat, this);
    }
    public Vector3 mulPositionTranslation(Matrix4fc mat, Vector3 dest) {
        dest.x = this.x + mat.m30();
        dest.y = this.y + mat.m31();
        dest.z = this.z + mat.m32();
        return dest;
    }
    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes that the matrix <code>mat</code> represents only a translation.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionTranslation(Matrix4dc mat) {
        return mulPositionTranslation(mat, this);
    }
    public Vector3 mulPositionTranslation(Matrix4dc mat, Vector3 dest) {
        dest.x = (float) (this.x + mat.m30());
        dest.y = (float) (this.y + mat.m31());
        dest.z = (float) (this.z + mat.m32());
        return dest;
    }

    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method makes no assumptions about the properties of the matrix <code>mat</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionGeneric(Matrix4fc mat) {
        return mulPositionGeneric(mat, this);
    }
    public Vector3 mulPositionGeneric(Matrix4fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        return dest;
    }
    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method makes no assumptions about the properties of the matrix <code>mat</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionGeneric(Matrix4dc mat) {
        return mulPositionGeneric(mat, this);
    }
    public Vector3 mulPositionGeneric(Matrix4dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = (float) Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        dest.y = (float) Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        dest.z = (float) Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        return dest;
    }

    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPosition(Matrix4x3fc mat) {
        int prop = mat.properties();
        if ((prop & Matrix4x3fc.PROPERTY_IDENTITY) != 0)
            return this;
        if ((prop & Matrix4x3fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, this);
        return mulPositionGeneric(mat);
    }
    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPosition(Matrix4x3dc mat) {
        int prop = mat.properties();
        if ((prop & Matrix4x3fc.PROPERTY_IDENTITY) != 0)
            return this;
        if ((prop & Matrix4x3fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, this);
        return mulPositionGeneric(mat);
    }
    public Vector3 mulPosition(Matrix4x3fc mat, Vector3 dest) {
        int prop = mat.properties();
        if ((prop & Matrix4x3fc.PROPERTY_IDENTITY) != 0)
            return dest.set(this);
        if ((prop & Matrix4x3fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, dest);
        return mulPositionGeneric(mat, dest);
    }
    public Vector3 mulPosition(Matrix4x3dc mat, Vector3 dest) {
        int prop = mat.properties();
        if ((prop & Matrix4x3fc.PROPERTY_IDENTITY) != 0)
            return dest.set(this);
        if ((prop & Matrix4x3fc.PROPERTY_TRANSLATION) != 0)
            return mulPositionTranslation(mat, dest);
        return mulPositionGeneric(mat, dest);
    }
    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method makes no assumptions about the properties of the matrix <code>mat</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionGeneric(Matrix4x3fc mat) {
        return mulPositionGeneric(mat, this);
    }
    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method makes no assumptions about the properties of the matrix <code>mat</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulPositionGeneric(Matrix4x3dc mat) {
        return mulPositionGeneric(mat, this);
    }
    public Vector3 mulPositionGeneric(Matrix4x3fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        return dest;
    }
    public Vector3 mulPositionGeneric(Matrix4x3dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = (float) Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        dest.y = (float) Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        dest.z = (float) Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        return dest;
    }

    /**
     * Multiply the transpose of the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M^T * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix whose transpose to multiply this vector by
     * @return this
     */
    public Vector3 mulTransposePosition(Matrix4fc mat) {
        return mulTransposePosition(mat, this);
    }
    public Vector3 mulTransposePosition(Matrix4fc mat, Vector3 dest) {
        int prop = mat.properties();
        if ((prop & Matrix4fc.PROPERTY_IDENTITY) != 0)
            return dest.set(this);
        return mulTransposePositionGeneric(mat, dest);
    }
    public Vector3 mulTransposePositionGeneric(Matrix4fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m01(), y, Math.fma(mat.m02(), z, mat.m03())));
        dest.y = Math.fma(mat.m10(), x, Math.fma(mat.m11(), y, Math.fma(mat.m12(), z, mat.m13())));
        dest.z = Math.fma(mat.m20(), x, Math.fma(mat.m21(), y, Math.fma(mat.m22(), z, mat.m23())));
        return dest;
    }
    /**
     * Multiply the transpose of the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M^T * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix whose transpose to multiply this vector by
     * @return this
     */
    public Vector3 mulTransposePosition(Matrix4dc mat) {
        return mulTransposePosition(mat, this);
    }
    public Vector3 mulTransposePosition(Matrix4dc mat, Vector3 dest) {
        int properties = mat.properties();
        if ((properties & Matrix4dc.PROPERTY_IDENTITY) != 0)
            return dest.set(this);
        return mulTransposePositionGeneric(mat, dest);
    }
    /**
     * Multiply the transpose of the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method makes no assumptions about the properties of the matrix <code>mat</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M^T * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix whose transpose to multiply this vector by
     * @return this
     */
    public Vector3 mulTransposePositionGeneric(Matrix4dc mat) {
        return mulTransposePositionGeneric(mat, this);
    }
    public Vector3 mulTransposePositionGeneric(Matrix4dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = (float) Math.fma(mat.m00(), x, Math.fma(mat.m01(), y, Math.fma(mat.m02(), z, mat.m03())));
        dest.y = (float) Math.fma(mat.m10(), x, Math.fma(mat.m11(), y, Math.fma(mat.m12(), z, mat.m13())));
        dest.z = (float) Math.fma(mat.m20(), x, Math.fma(mat.m21(), y, Math.fma(mat.m22(), z, mat.m23())));
        return dest;
    }

    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code> and return the <i>w</i> component
     * of the resulting 4D vector.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return the <i>w</i> component of the resulting 4D vector after multiplication
     */
    public float mulPositionW(Matrix4fc mat) {
        return mulPositionW(mat, this);
    }

    public float mulPositionW(Matrix4fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        float w = Math.fma(mat.m03(), x, Math.fma(mat.m13(), y, Math.fma(mat.m23(), z, mat.m33())));
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        return w;
    }

    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code> and return the <i>w</i> component
     * of the resulting 4D vector.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>1.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return the <i>w</i> component of the resulting 4D vector after multiplication
     */
    public float mulPositionW(Matrix4dc mat) {
        return mulPositionW(mat, this);
    }

    public float mulPositionW(Matrix4dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        float w = (float) Math.fma(mat.m03(), x, Math.fma(mat.m13(), y, Math.fma(mat.m23(), z, mat.m33())));
        dest.x = (float) Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, Math.fma(mat.m20(), z, mat.m30())));
        dest.y = (float) Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, Math.fma(mat.m21(), z, mat.m31())));
        dest.z = (float) Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, Math.fma(mat.m22(), z, mat.m32())));
        return w;
    }

    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>0.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulDirection(Matrix4dc mat) {
        return mulDirection(mat, this);
    }

    /**
     * Multiply the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>0.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulDirection(Matrix4fc mat) {
        return mulDirection(mat, this);
    }

    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>0.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulDirection(Matrix4x3fc mat) {
        return mulDirection(mat, this);
    }
    /**
     * Multiply the given 4x3 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>0.0</code>.
     * <p>
     * Note that this method performs the operation <code>M * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix to multiply this vector by
     * @return this
     */
    public Vector3 mulDirection(Matrix4x3dc mat) {
        return mulDirection(mat, this);
    }

    public Vector3 mulDirection(Matrix4dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = (float) Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z));
        dest.y = (float) Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z));
        dest.z = (float) Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, mat.m22() * z));
        return dest;
    }

    public Vector3 mulDirection(Matrix4fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z));
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z));
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, mat.m22() * z));
        return dest;
    }

    public Vector3 mulDirection(Matrix4x3fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z));
        dest.y = Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z));
        dest.z = Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, mat.m22() * z));
        return dest;
    }
    public Vector3 mulDirection(Matrix4x3dc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = (float) Math.fma(mat.m00(), x, Math.fma(mat.m10(), y, mat.m20() * z));
        dest.y = (float) Math.fma(mat.m01(), x, Math.fma(mat.m11(), y, mat.m21() * z));
        dest.z = (float) Math.fma(mat.m02(), x, Math.fma(mat.m12(), y, mat.m22() * z));
        return dest;
    }

    /**
     * Multiply the transpose of the given 4x4 matrix <code>mat</code> with <code>this</code>.
     * <p>
     * This method assumes the <code>w</code> component of <code>this</code> to be <code>0.0</code>.
     * <p>
     * Note that this method performs the operation <code>M^T * this</code>, where <code>M</code> is the provided matrix
     * and thus interprets <code>this</code> as a <em>column</em> vector.
     *
     * @param mat
     *          the matrix whose transpose to multiply this vector by
     * @return this
     */
    public Vector3 mulTransposeDirection(Matrix4fc mat) {
        return mulTransposeDirection(mat, this);
    }

    public Vector3 mulTransposeDirection(Matrix4fc mat, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = Math.fma(mat.m00(), x, Math.fma(mat.m01(), y, mat.m02() * z));
        dest.y = Math.fma(mat.m10(), x, Math.fma(mat.m11(), y, mat.m12() * z));
        dest.z = Math.fma(mat.m20(), x, Math.fma(mat.m21(), y, mat.m22() * z));
        return dest;
    }

    /**
     * Multiply all components of this vector by the given scalar
     * value.
     * 
     * @param scalar
     *          the scalar to multiply this vector by
     * @return this
     */
    public Vector3 mul(float scalar) {
        return mul(scalar, this);
    }

    public Vector3 mul(float scalar, Vector3 dest) {
        dest.x = this.x * scalar;
        dest.y = this.y * scalar;
        dest.z = this.z * scalar;
        return dest;
    }

    /**
     * Multiply the components of this vector by the given scalar values and store the result in <code>this</code>.
     * 
     * @param x
     *          the x component to multiply this vector by
     * @param y
     *          the y component to multiply this vector by
     * @param z
     *          the z component to multiply this vector by
     * @return this
     */
    public Vector3 mul(float x, float y, float z) {
        return mul(x, y, z, this);
    }

    public Vector3 mul(float x, float y, float z, Vector3 dest) {
        dest.x = this.x * x;
        dest.y = this.y * y;
        dest.z = this.z * z;
        return dest;
    }

    /**
     * Divide all components of this vector by the given scalar
     * value.
     * 
     * @param scalar
     *          the scalar to divide by
     * @return this
     */
    public Vector3 div(float scalar) {
        return div(scalar, this);
    }

    public Vector3 div(float scalar, Vector3 dest) {
        float inv = 1.0f / scalar;
        dest.x = this.x * inv;
        dest.y = this.y * inv;
        dest.z = this.z * inv;
        return dest;
    }

    /**
     * Divide the components of this vector by the given scalar values and store the result in <code>this</code>.
     * 
     * @param x
     *          the x component to divide this vector by
     * @param y
     *          the y component to divide this vector by
     * @param z
     *          the z component to divide this vector by
     * @return this
     */
    public Vector3 div(float x, float y, float z) {
        return div(x, y, z, this);
    }

    public Vector3 div(float x, float y, float z, Vector3 dest) {
        dest.x = this.x / x;
        dest.y = this.y / y;
        dest.z = this.z / z;
        return dest;
    }

    /**
     * Rotate this vector by the given quaternion <code>quat</code> and store the result in <code>this</code>.
     * 
     * @see Quaternionfc#transform(Vector3)
     * 
     * @param quat
     *          the quaternion to rotate this vector
     * @return this
     */
    public Vector3 rotate(Quaternionfc quat) {
        return quat.transform(this, this);
    }

    public Vector3 rotate(Quaternionfc quat, Vector3 dest) {
        return quat.transform(this, dest);
    }

    public Quaternionf rotationTo(Vector3c toDir, Quaternionf dest) {
        return dest.rotationTo(this, toDir);
    }

    public Quaternionf rotationTo(float toDirX, float toDirY, float toDirZ, Quaternionf dest) {
        return dest.rotationTo(x, y, z, toDirX, toDirY, toDirZ);
    }

    /**
     * Rotate this vector the specified radians around the given rotation axis.
     * <p>
     * If the rotation axis is either <code>(1, 0, 0)</code>, <code>(0, 1, 0)</code> or <code>(0, 0, 1)</code>.
     * then {@link #rotateX(float) rotateX()}, {@link #rotateY(float) rotateY()} or
     * {@link #rotateZ(float) rotateZ()}, respectively, should be used instead.
     *
     * @param angle
     *          the angle in radians
     * @param x
     *          the x component of the rotation axis
     * @param y
     *          the y component of the rotation axis
     * @param z
     *          the z component of the rotation axis
     * @return this
     */
    public Vector3 rotateAxis(float angle, float x, float y, float z) {
        return rotateAxis(angle, x, y, z, this);
    }

    public Vector3 rotateAxis(float angle, float aX, float aY, float aZ, Vector3 dest) {
        if (aY == 0.0f && aZ == 0.0f && Math.absEqualsOne(aX))
            return rotateX(aX * angle, dest);
        else if (aX == 0.0f && aZ == 0.0f && Math.absEqualsOne(aY))
            return rotateY(aY * angle, dest);
        else if (aX == 0.0f && aY == 0.0f && Math.absEqualsOne(aZ))
            return rotateZ(aZ * angle, dest);
        return rotateAxisInternal(angle, aX, aY, aZ, dest);
    }
    private Vector3 rotateAxisInternal(float angle, float aX, float aY, float aZ, Vector3 dest) {
        float hangle = angle * 0.5f;
        float sinAngle = Math.sin(hangle);
        float qx = aX * sinAngle, qy = aY * sinAngle, qz = aZ * sinAngle;
        float qw = Math.cosFromSin(sinAngle, hangle);
        float w2 = qw * qw, x2 = qx * qx, y2 = qy * qy, z2 = qz * qz, zw = qz * qw;
        float xy = qx * qy, xz = qx * qz, yw = qy * qw, yz = qy * qz, xw = qx * qw;
        float x = this.x, y = this.y, z = this.z;
        dest.x = (w2 + x2 - z2 - y2) * x + (-zw + xy - zw + xy) * y + (yw + xz + xz + yw) * z;
        dest.y = (xy + zw + zw + xy) * x + ( y2 - z2 + w2 - x2) * y + (yz + yz - xw - xw) * z;
        dest.z = (xz - yw + xz - yw) * x + ( yz + yz + xw + xw) * y + (z2 - y2 - x2 + w2) * z;
        return dest;
    }

    /**
     * Rotate this vector the specified radians around the X axis.
     * 
     * @param angle
     *          the angle in radians
     * @return this
     */
    public Vector3 rotateX(float angle) {
        return rotateX(angle, this);
    }

    public Vector3 rotateX(float angle, Vector3 dest) {
        float sin = Math.sin(angle), cos = Math.cosFromSin(sin, angle);
        float y = this.y * cos - this.z * sin;
        float z = this.y * sin + this.z * cos;
        dest.x = this.x;
        dest.y = y;
        dest.z = z;
        return dest;
    }

    /**
     * Rotate this vector the specified radians around the Y axis.
     * 
     * @param angle
     *          the angle in radians
     * @return this
     */
    public Vector3 rotateY(float angle) {
        return rotateY(angle, this);
    }

    public Vector3 rotateY(float angle, Vector3 dest) {
        float sin = Math.sin(angle), cos = Math.cosFromSin(sin, angle);
        float x =  this.x * cos + this.z * sin;
        float z = -this.x * sin + this.z * cos;
        dest.x = x;
        dest.y = this.y;
        dest.z = z;
        return dest;
    }

    /**
     * Rotate this vector the specified radians around the Z axis.
     * 
     * @param angle
     *          the angle in radians
     * @return this
     */
    public Vector3 rotateZ(float angle) {
        return rotateZ(angle, this);
    }

    public Vector3 rotateZ(float angle, Vector3 dest) {
        float sin = Math.sin(angle), cos = Math.cosFromSin(sin, angle);
        float x = this.x * cos - this.y * sin;
        float y = this.x * sin + this.y * cos;
        dest.x = x;
        dest.y = y;
        dest.z = this.z;
        return dest;
    }

    public float lengthSquared() {
        return Math.fma(x, x, Math.fma(y, y, z * z));
    }

    /**
     * Get the length squared of a 3-dimensional single-precision vector.
     *
     * @param x The vector's x component
     * @param y The vector's y component
     * @param z The vector's z component
     *
     * @return the length squared of the given vector
     *
     * @author F. Neurath
     */
    public static float lengthSquared(float x, float y, float z) {
        return Math.fma(x, x, Math.fma(y, y, z * z));
    }

    public float length() {
        return Math.sqrt(Math.fma(x, x, Math.fma(y, y, z * z)));
    }

    /**
     * Get the length of a 3-dimensional single-precision vector.
     *
     * @param x The vector's x component
     * @param y The vector's y component
     * @param z The vector's z component
     *
     * @return the length of the given vector
     *
     * @author F. Neurath
     */
    public static float length(float x, float y, float z) {
        return Math.sqrt(Math.fma(x, x, Math.fma(y, y, z * z)));
    }

    /**
     * Normalize this vector.
     * 
     * @return this
     */
    public Vector3 normalize() {
        return normalize(this);
    }

    public Vector3 normalize(Vector3 dest) {
        float scalar = Math.invsqrt(Math.fma(x, x, Math.fma(y, y, z * z)));
        dest.x = this.x * scalar;
        dest.y = this.y * scalar;
        dest.z = this.z * scalar;
        return dest;
    }

    /**
     * Scale this vector to have the given length.
     * 
     * @param length
     *          the desired length
     * @return this
     */
    public Vector3 normalize(float length) {
        return normalize(length, this);
    }

    public Vector3 normalize(float length, Vector3 dest) {
        float scalar = Math.invsqrt(Math.fma(x, x, Math.fma(y, y, z * z))) * length;
        dest.x = this.x * scalar;
        dest.y = this.y * scalar;
        dest.z = this.z * scalar;
        return dest;
    }

    /**
     * Set this vector to be the cross product of itself and <code>v</code>.
     * 
     * @param v
     *          the other vector
     * @return this
     */
    public Vector3 cross(Vector3c v) {
        return cross(v, this);
    }

    /**
     * Set this vector to be the cross product of itself and <code>(x, y, z)</code>.
     * 
     * @param x
     *          the x component of the other vector
     * @param y
     *          the y component of the other vector
     * @param z
     *          the z component of the other vector
     * @return this
     */
    public Vector3 cross(float x, float y, float z) {
        return cross(x, y, z, this);
    }

    public Vector3 cross(Vector3c v, Vector3 dest) {
        float rx = Math.fma(y, v.z(), -z * v.y());
        float ry = Math.fma(z, v.x(), -x * v.z());
        float rz = Math.fma(x, v.y(), -y * v.x());
        dest.x = rx;
        dest.y = ry;
        dest.z = rz;
        return dest;
    }

    public Vector3 cross(float x, float y, float z, Vector3 dest) {
        float rx = Math.fma(this.y, z, -this.z * y);
        float ry = Math.fma(this.z, x, -this.x * z);
        float rz = Math.fma(this.x, y, -this.y * x);
        dest.x = rx;
        dest.y = ry;
        dest.z = rz;
        return dest;
    }

    public float distance(Vector3c v) {
        float dx = this.x - v.x();
        float dy = this.y - v.y();
        float dz = this.z - v.z();
        return Math.sqrt(Math.fma(dx, dx, Math.fma(dy, dy, dz * dz)));
    }

    public float distance(float x, float y, float z) {
        float dx = this.x - x;
        float dy = this.y - y;
        float dz = this.z - z;
        return Math.sqrt(Math.fma(dx, dx, Math.fma(dy, dy, dz * dz)));
    }

    public float distanceSquared(Vector3c v) {
        float dx = this.x - v.x();
        float dy = this.y - v.y();
        float dz = this.z - v.z();
        return Math.fma(dx, dx, Math.fma(dy, dy, dz * dz));
    }

    public float distanceSquared(float x, float y, float z) {
        float dx = this.x - x;
        float dy = this.y - y;
        float dz = this.z - z;
        return Math.fma(dx, dx, Math.fma(dy, dy, dz * dz));
    }

    /**
     * Return the distance between <code>(x1, y1, z1)</code> and <code>(x2, y2, z2)</code>.
     *
     * @param x1
     *          the x component of the first vector
     * @param y1
     *          the y component of the first vector
     * @param z1
     *          the z component of the first vector
     * @param x2
     *          the x component of the second vector
     * @param y2
     *          the y component of the second vector
     * @param z2
     *          the z component of the second vector
     * @return the euclidean distance
     */
    public static float distance(float x1, float y1, float z1, float x2, float y2, float z2) {
        return Math.sqrt(distanceSquared(x1, y1, z1, x2, y2, z2));
    }

    /**
     * Return the squared distance between <code>(x1, y1, z1)</code> and <code>(x2, y2, z2)</code>.
     *
     * @param x1
     *          the x component of the first vector
     * @param y1
     *          the y component of the first vector
     * @param z1
     *          the z component of the first vector
     * @param x2
     *          the x component of the second vector
     * @param y2
     *          the y component of the second vector
     * @param z2
     *          the z component of the second vector
     * @return the euclidean distance squared
     */
    public static float distanceSquared(float x1, float y1, float z1, float x2, float y2, float z2) {
        float dx = x1 - x2;
        float dy = y1 - y2;
        float dz = z1 - z2;
        return Math.fma(dx, dx, Math.fma(dy, dy, dz * dz));
    }

    public float dot(Vector3c v) {
        return Math.fma(this.x, v.x(), Math.fma(this.y, v.y(), this.z * v.z()));
    }

    public float dot(float x, float y, float z) {
        return Math.fma(this.x, x, Math.fma(this.y, y, this.z * z));
    }

    public float angleCos(Vector3c v) {
        float x = this.x, y = this.y, z = this.z;
        float length1Squared = Math.fma(x, x, Math.fma(y, y, z * z));
        float length2Squared = Math.fma(v.x(), v.x(), Math.fma(v.y(), v.y(), v.z() * v.z()));
        float dot = Math.fma(x, v.x(), Math.fma(y, v.y(), z * v.z()));
        return dot / (float)Math.sqrt(length1Squared * length2Squared);
    }

    public float angle(Vector3c v) {
        float cos = angleCos(v);
        // This is because sometimes cos goes above 1 or below -1 because of lost precision
        cos = cos < 1 ? cos : 1;
        cos = cos > -1 ? cos : -1;
        return Math.acos(cos);
    }

    public float angleSigned(Vector3c v, Vector3c n) {
        return angleSigned(v.x(), v.y(), v.z(), n.x(), n.y(), n.z());
    }

    public float angleSigned(float x, float y, float z, float nx, float ny, float nz) {
        float tx = this.x, ty = this.y, tz = this.z;
        return Math.atan2(
                (ty * z - tz * y) * nx + (tz * x - tx * z) * ny + (tx * y - ty * x) * nz,
                tx * x + ty * y + tz * z);
    }

    /**
     * Set the components of this vector to be the component-wise minimum of this and the other vector.
     *
     * @param v
     *          the other vector
     * @return this
     */
    public Vector3 min(Vector3c v) {
        return min(v, this);
    }

    public Vector3 min(Vector3c v, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = x < v.x() ? x : v.x();
        dest.y = y < v.y() ? y : v.y();
        dest.z = z < v.z() ? z : v.z();
        return dest;
    }

    /**
     * Set the components of this vector to be the component-wise maximum of this and the other vector.
     *
     * @param v
     *          the other vector
     * @return this
     */
    public Vector3 max(Vector3c v) {
        return max(v, this);
    }

    public Vector3 max(Vector3c v, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        dest.x = x > v.x() ? x : v.x();
        dest.y = y > v.y() ? y : v.y();
        dest.z = z > v.z() ? z : v.z();
        return dest;
    }

    /**
     * Set all components to zero.
     * 
     * @return this
     */
    public Vector3 zero() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    }

    /**
     * Return a string representation of this vector.
     * <p>
     * This method creates a new {@link DecimalFormat} on every invocation with the format string "<code>0.000E0;-</code>".
     * 
     * @return the string representation
     */
    public String toString() {
        return Runtime.formatNumbers(toString(Options.NUMBER_FORMAT));
    }

    /**
     * Return a string representation of this vector by formatting the vector components with the given {@link NumberFormat}.
     * 
     * @param formatter
     *          the {@link NumberFormat} used to format the vector components with
     * @return the string representation
     */
    public String toString(NumberFormat formatter) {
        return "(" + Runtime.format(x, formatter) + " " + Runtime.format(y, formatter) + " " + Runtime.format(z, formatter) + ")";
    }

    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeFloat(x);
        out.writeFloat(y);
        out.writeFloat(z);
    }

    public void readExternal(ObjectInput in) throws IOException,
            ClassNotFoundException {
        set(in.readFloat(), in.readFloat(), in.readFloat());
    }

    /**
     * Negate this vector.
     * 
     * @return this
     */
    public Vector3 negate() {
        return negate(this);
    }

    public Vector3 negate(Vector3 dest) {
        dest.x = -x;
        dest.y = -y;
        dest.z = -z;
        return dest;
    }

    /**
     * Set <code>this</code> vector's components to their respective absolute values.
     * 
     * @return this
     */
    public Vector3 absolute() {
        return absolute(this);
    }

    public Vector3 absolute(Vector3 dest) {
        dest.x = Math.abs(this.x);
        dest.y = Math.abs(this.y);
        dest.z = Math.abs(this.z);
        return dest;
    }

    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + Float.floatToIntBits(x);
        result = prime * result + Float.floatToIntBits(y);
        result = prime * result + Float.floatToIntBits(z);
        return result;
    }

    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Vector3 other = (Vector3) obj;
        if (Float.floatToIntBits(x) != Float.floatToIntBits(other.x))
            return false;
        if (Float.floatToIntBits(y) != Float.floatToIntBits(other.y))
            return false;
        if (Float.floatToIntBits(z) != Float.floatToIntBits(other.z))
            return false;
        return true;
    }

    public boolean equals(Vector3c v, float delta) {
        if (this == v)
            return true;
        if (v == null)
            return false;
        if (getClass() != v.getClass())
            return false;
        if (!Runtime.equals(x, v.x(), delta))
            return false;
        if (!Runtime.equals(y, v.y(), delta))
            return false;
        if (!Runtime.equals(z, v.z(), delta))
            return false;
        return true;
    }

    public boolean equals(float x, float y, float z) {
        if (Float.floatToIntBits(this.x) != Float.floatToIntBits(x))
            return false;
        if (Float.floatToIntBits(this.y) != Float.floatToIntBits(y))
            return false;
        if (Float.floatToIntBits(this.z) != Float.floatToIntBits(z))
            return false;
        return true;
    }

    /**
     * Reflect this vector about the given <code>normal</code> vector.
     * 
     * @param normal
     *          the vector to reflect about
     * @return this
     */
    public Vector3 reflect(Vector3c normal) {
        float x = normal.x();
        float y = normal.y();
        float z = normal.z();
        float dot = Math.fma(this.x, x, Math.fma(this.y, y, this.z * z));
        this.x = this.x - (dot + dot) * x;
        this.y = this.y - (dot + dot) * y;
        this.z = this.z - (dot + dot) * z;
        return this;
    }

    /**
     * Reflect this vector about the given normal vector.
     * 
     * @param x
     *          the x component of the normal
     * @param y
     *          the y component of the normal
     * @param z
     *          the z component of the normal
     * @return this
     */
    public Vector3 reflect(float x, float y, float z) {
        float dot = Math.fma(this.x, x, Math.fma(this.y, y, this.z * z));
        this.x = this.x - (dot + dot) * x;
        this.y = this.y - (dot + dot) * y;
        this.z = this.z - (dot + dot) * z;
        return this;
    }

    public Vector3 reflect(Vector3c normal, Vector3 dest) {
        return reflect(normal.x(), normal.y(), normal.z(), dest);
    }

    public Vector3 reflect(float x, float y, float z, Vector3 dest) {
        float dot = this.dot(x, y, z);
        dest.x = this.x - (dot + dot) * x;
        dest.y = this.y - (dot + dot) * y;
        dest.z = this.z - (dot + dot) * z;
        return dest;
    }

    /**
     * Compute the half vector between this and the other vector.
     * 
     * @param other
     *          the other vector
     * @return this
     */
    public Vector3 half(Vector3c other) {
        return this.set(this).add(other.x(), other.y(), other.z()).normalize();
    }

    /**
     * Compute the half vector between this and the vector <code>(x, y, z)</code>.
     * 
     * @param x
     *          the x component of the other vector
     * @param y
     *          the y component of the other vector
     * @param z
     *          the z component of the other vector
     * @return this
     */
    public Vector3 half(float x, float y, float z) {
        return half(x, y, z, this);
    }

    public Vector3 half(Vector3c other, Vector3 dest) {
        return half(other.x(), other.y(), other.z(), dest);
    }

    public Vector3 half(float x, float y, float z, Vector3 dest) {
        return dest.set(this).add(x, y, z).normalize();
    }

    public Vector3 smoothStep(Vector3c v, float t, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        float t2 = t * t;
        float t3 = t2 * t;
        dest.x = (x + x - v.x() - v.x()) * t3 + (3.0f * v.x() - 3.0f * x) * t2 + x * t + x;
        dest.y = (y + y - v.y() - v.y()) * t3 + (3.0f * v.y() - 3.0f * y) * t2 + y * t + y;
        dest.z = (z + z - v.z() - v.z()) * t3 + (3.0f * v.z() - 3.0f * z) * t2 + z * t + z;
        return dest;
    }

    public Vector3 hermite(Vector3c t0, Vector3c v1, Vector3c t1, float t, Vector3 dest) {
        float x = this.x, y = this.y, z = this.z;
        float t2 = t * t;
        float t3 = t2 * t;
        dest.x = (x + x - v1.x() - v1.x() + t1.x() + t0.x()) * t3 + (3.0f * v1.x() - 3.0f * x - t0.x() - t0.x() - t1.x()) * t2 + x * t + x;
        dest.y = (y + y - v1.y() - v1.y() + t1.y() + t0.y()) * t3 + (3.0f * v1.y() - 3.0f * y - t0.y() - t0.y() - t1.y()) * t2 + y * t + y;
        dest.z = (z + z - v1.z() - v1.z() + t1.z() + t0.z()) * t3 + (3.0f * v1.z() - 3.0f * z - t0.z() - t0.z() - t1.z()) * t2 + z * t + z;
        return dest;
    }

    /**
     * Linearly interpolate <code>this</code> and <code>other</code> using the given interpolation factor <code>t</code>
     * and store the result in <code>this</code>.
     * <p>
     * If <code>t</code> is <code>0.0</code> then the result is <code>this</code>. If the interpolation factor is <code>1.0</code>
     * then the result is <code>other</code>.
     * 
     * @param other
     *          the other vector
     * @param t
     *          the interpolation factor between 0.0 and 1.0
     * @return this
     */
    public Vector3 lerp(Vector3c other, float t) {
        return lerp(other, t, this);
    }

    public Vector3 lerp(Vector3c other, float t, Vector3 dest) {
        dest.x = Math.fma(other.x() - x, t, x);
        dest.y = Math.fma(other.y() - y, t, y);
        dest.z = Math.fma(other.z() - z, t, z);
        return dest;
    }

    public float get(int component) throws IllegalArgumentException {
        switch (component) {
        case 0:
            return x;
        case 1:
            return y;
        case 2:
            return z;
        default:
            throw new IllegalArgumentException();
        }
    }

    public Vector3i get(int mode, Vector3i dest) {
        dest.x = Math.roundUsing(this.x(), mode);
        dest.y = Math.roundUsing(this.y(), mode);
        dest.z = Math.roundUsing(this.z(), mode);
        return dest;
    }

    public Vector3 get(Vector3 dest) {
        dest.x = this.x();
        dest.y = this.y();
        dest.z = this.z();
        return dest;
    }

    public Vector3d get(Vector3d dest) {
        dest.x = this.x();
        dest.y = this.y();
        dest.z = this.z();
        return dest;
    }

    public int maxComponent() {
        float absX = Math.abs(x);
        float absY = Math.abs(y);
        float absZ = Math.abs(z);
        if (absX >= absY && absX >= absZ) {
            return 0;
        } else if (absY >= absZ) {
            return 1;
        }
        return 2;
    }

    public int minComponent() {
        float absX = Math.abs(x);
        float absY = Math.abs(y);
        float absZ = Math.abs(z);
        if (absX < absY && absX < absZ) {
            return 0;
        } else if (absY < absZ) {
            return 1;
        }
        return 2;
    }

    public Vector3 orthogonalize(Vector3c v, Vector3 dest) {
        /*
         * http://lolengine.net/blog/2013/09/21/picking-orthogonal-vector-combing-coconuts
         */
        float rx, ry, rz;
        if (Math.abs(v.x()) > Math.abs(v.z())) {
            rx = -v.y();
            ry = v.x();
            rz = 0.0f;
        } else {
            rx = 0.0f;
            ry = -v.z();
            rz = v.y();
        }
        float invLen = Math.invsqrt(rx * rx + ry * ry + rz * rz);
        dest.x = rx * invLen;
        dest.y = ry * invLen;
        dest.z = rz * invLen;
        return dest;
    }

    /**
     * Transform <code>this</code> vector so that it is orthogonal to the given vector <code>v</code> and normalize the result.
     * <p>
     * Reference: <a href="https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process">Gram–Schmidt process</a>
     * 
     * @param v
     *          the reference vector which the result should be orthogonal to
     * @return this
     */
    public Vector3 orthogonalize(Vector3c v) {
        return orthogonalize(v, this);
    }

    public Vector3 orthogonalizeUnit(Vector3c v, Vector3 dest) {
        return orthogonalize(v, dest);
    }

    /**
     * Transform <code>this</code> vector so that it is orthogonal to the given unit vector <code>v</code> and normalize the result.
     * <p>
     * The vector <code>v</code> is assumed to be a {@link #normalize() unit} vector.
     * <p>
     * Reference: <a href="https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process">Gram–Schmidt process</a>
     * 
     * @param v
     *          the reference unit vector which the result should be orthogonal to
     * @return this
     */
    public Vector3 orthogonalizeUnit(Vector3c v) {
        return orthogonalizeUnit(v, this);
    }

    /**
     * Set each component of this vector to the largest (closest to positive
     * infinity) {@code float} value that is less than or equal to that
     * component and is equal to a mathematical integer.
     *
     * @return this
     */
    public Vector3 floor() {
        return floor(this);
    }

    public Vector3 floor(Vector3 dest) {
        dest.x = Math.floor(x);
        dest.y = Math.floor(y);
        dest.z = Math.floor(z);
        return dest;
    }

    /**
     * Set each component of this vector to the smallest (closest to negative
     * infinity) {@code float} value that is greater than or equal to that
     * component and is equal to a mathematical integer.
     *
     * @return this
     */
    public Vector3 ceil() {
        return ceil(this);
    }

    public Vector3 ceil(Vector3 dest) {
        dest.x = Math.ceil(x);
        dest.y = Math.ceil(y);
        dest.z = Math.ceil(z);
        return dest;
    }

    /**
     * Set each component of this vector to the closest float that is equal to
     * a mathematical integer, with ties rounding to positive infinity.
     *
     * @return this
     */
    public Vector3 round() {
        return round(this);
    }

    public Vector3 round(Vector3 dest) {
        dest.x = Math.round(x);
        dest.y = Math.round(y);
        dest.z = Math.round(z);
        return dest;
    }

    public boolean isFinite() {
        return Math.isFinite(x) && Math.isFinite(y) && Math.isFinite(z);
    }

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

}
