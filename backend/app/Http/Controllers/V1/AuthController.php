<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Student self registration
     * Faculty is NOT assigned here
     */
    public function register(RegisterRequest $request)
    {
        // Only BODY data + only validated keys
        $data = $request->only(array_keys($request->validated()));

        $user = User::create([
            'name'      => $data['name'],
            'email'     => $data['email'],
            'password'  => $data['password'],
            'is_active' => 1,
            'is_admin'  => 0,
        ]);

        // attach default student role
        $studentRole = Role::where('name', 'student')->firstOrFail();
        $user->roles()->attach($studentRole->id);

        // create JWT
        $token = JWTAuth::fromUser($user);

        return $this->respondWithToken($token, $user);
    }

    /**
     * Login
     */
    public function login(LoginRequest $request)
    {
        // body-only credentials
        $credentials = $request->only(['email', 'password']);

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = JWTAuth::user();

        // active check
        if ((int) $user->is_active !== 1) {
            JWTAuth::invalidate($token);

            return response()->json([
                'message' => 'User account is disabled'
            ], 403);
        }

        return $this->respondWithToken($token, $user);
    }

    /**
     * Logout
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get authenticated user
     */
    public function me()
    {
        $user = JWTAuth::user()->load([
            'roles',
            'categories' // your category-user pivot
        ]);

        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Token response
     */
    protected function respondWithToken(string $token, User $user)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => JWTAuth::factory()->getTTL() . ' minutes',
            'user'         => $user->load('roles', 'faculties'),
        ]);
    }
}
